import { apply, runIf } from 'ruply';
import { MollieClient, Payment } from '../..';
import NetworkMocker, { getApiKeyClientProvider } from '../NetworkMocker';
import observePromise from '../matchers/observePromise';
import tick from '../tick';
import '../matchers/toBeDepleted';

describe('multipage-iteration', () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider(true));
  let mollieClient: MollieClient;

  function intercept(limit: number, from?: number) {
    const to = limit + (from ?? 0);
    const interceptor = networkMocker.intercept('GET', `/payments?${runIf(from, from => `from=tr_mock${from}&`) ?? ''}limit=${limit}`, 200, {
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
      interceptor,
      intercept: (limit: number) => intercept(limit, to),
    };
  }

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
  });

  test('no-throttling', async () => {
    // Two pages of 128 values are requested.
    intercept(128).intercept(128);
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
    intercept(250).intercept(50);
    return mollieClient.payments
      .iterate({ valuesPerMinute: 5000 })
      .take(300)
      .forEach(() => {});
  });

  test('throttling', async () => {
    const { interceptor: firstInterceptor, intercept: interceptNext } = intercept(128);
    const { interceptor: secondInterceptor } = interceptNext(128);

    jest.useFakeTimers();

    let count = 0;
    const promise = observePromise(
      (async () => {
        for await (let _ of mollieClient.payments.iterate({ valuesPerMinute: 1280 })) {
          if (++count == 200) {
            break;
          }
        }
      })(),
    );

    // Expect the first network request to have been made, and the count to be 128.
    await jest.advanceTimersByTimeAsync(0); // process request
    await tick();
    expect(firstInterceptor).toBeDepleted();
    expect(secondInterceptor).not.toBeDepleted();
    expect(count).toBe(128);

    // Expect the second network request to have been made after six seconds, and the count to be 200.
    await tick();
    await jest.advanceTimersByTimeAsync(6e3);
    await tick();
    expect(secondInterceptor).toBeDepleted();
    expect(count).toBe(200);
    expect(promise).toBeFulfilledWith(undefined);

    jest.useRealTimers();
  });

  afterAll(() => networkMocker.cleanup());
});
