import { MollieClient, Payment } from '../..';
import NetworkMocker, { getApiKeyClientMode } from '../NetworkMocker';
import nock from 'nock';
import { apply, run, runIf } from 'ruply';

function addInterceptor(limit: number, from?: number) {
  const to = limit + (from ?? 0);
  nock('https://api.mollie.com:443')
    .get(`/v2/payments?${runIf(from, from => `from=tr_mock${from}&`) ?? ''}limit=${limit}`)
    .reply(200, {
      _embedded: {
        payments: apply([] as Partial<Payment>[], payments => {
          for (let index = from ?? 0; to != index; index++) {
            payments.push({
              resource: 'payment',
              id: `tr_mock${index}`,
            });
          }
        }),
      },
      count: limit,
      _links: {
        next: {
          href: `https://api.mollie.com/v2/payments?from=tr_mock${to}&limit=${limit}`,
          type: 'application/hal+json',
        },
      },
    });
  return {
    addInterceptor: (limit: number) => addInterceptor(limit, to),
  };
}

describe('multipage-iteration', () => {
  const networkMocker = new NetworkMocker(getApiKeyClientMode(true));
  let mollieClient: MollieClient;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
  });

  test('no-throttling', async () => {
    // Two pages of 128 values are requested.
    addInterceptor(128).addInterceptor(128);
    // (Break after 200 values.)
    let count = 0;
    for await (let _ of mollieClient.payments.iterate({ valuesPerMinute: 5000 })) {
      if (++count == 200) {
        break;
      }
    }
  });

  test('no-throttling-take', () => {
    // A page of 250 values is requested (limit imposed by the Mollie API), followed by a page of 50 values.
    addInterceptor(250).addInterceptor(50);
    return mollieClient.payments
      .iterate({ valuesPerMinute: 5000 })
      .take(300)
      .forEach(() => {});
  });

  test('throttling', () => {
    const waitJiffy = run(setTimeout, realSetTimeout => () => new Promise<void>(resolve => realSetTimeout(resolve, 10)));
    jest.useFakeTimers();
    let count = 0;
    return Promise.all([
      (async () => {
        // Add the interceptor for the first page.
        addInterceptor(128);
        // Wait, so the function below can iterate.
        await waitJiffy();
        // Expect 128 values to have been consumed. This proves throttling is applied, as without throttling the
        // iterator would continue until 200 values are consumed.
        expect(count).toBe(128);
        // Add the interceptor for the second page.
        addInterceptor(128, 128);
        // Wait six seconds. This should cause the function below to iterate further.
        jest.advanceTimersByTime(6e3);
        await waitJiffy();
        // Expect 200 values to have been consumed.
        expect(count).toBe(200);
      })(),
      (async () => {
        for await (let _ of mollieClient.payments.iterate({ valuesPerMinute: 1280 })) {
          if (++count == 200) {
            break;
          }
        }
      })(),
    ]).then(jest.useRealTimers.bind(jest));
  });

  afterAll(() => networkMocker.cleanup());
});
