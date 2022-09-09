import { Body, Interceptor, ReplyHeaders } from 'nock';
import { apply } from 'ruply';

import { Locale, MollieClient, SequenceType } from '../..';
import NetworkMocker, { getApiKeyClientProvider } from '../NetworkMocker';
import observePromise from '../matchers/observePromise';
import tick from '../tick';
import '../matchers/toBeDepleted';

const paymentResponse = {
  resource: 'payment',
  id: 'tr_WDqYK6vllg',
  mode: 'test',
  createdAt: '2018-03-20T13:13:37+00:00',
  amount: {
    value: '10.00',
    currency: 'EUR',
  },
  description: 'Order #12345',
  method: null,
  metadata: {
    order_id: '12345',
  },
  status: 'open',
  isCancelable: false,
  locale: 'nl_NL',
  restrictPaymentMethodsToCountry: 'NL',
  expiresAt: '2018-03-20T13:28:37+00:00',
  details: null,
  profileId: 'pfl_QkEhN94Ba',
  sequenceType: 'oneoff',
  redirectUrl: 'https://webshop.example.org/order/12345/',
  webhookUrl: 'https://webshop.example.org/payments/webhook/',
  _links: {
    self: {
      href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
      type: 'application/hal+json',
    },
    checkout: {
      href: 'https://www.mollie.com/payscreen/select-method/WDqYK6vllg',
      type: 'text/html',
    },
    dashboard: {
      href: 'https://www.mollie.com/dashboard/org_12345678/payments/tr_WDqYK6vllg',
      type: 'application/json',
    },
    documentation: {
      href: 'https://docs.mollie.com/reference/v2/payments-api/get-payment',
      type: 'text/html',
    },
  },
};

describe('request-retrying', () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider(true));
  let mollieClient: MollieClient;
  let intercept: (responseStatusCode: number, responseBody: Body, responseHeaders?: ReplyHeaders) => Interceptor;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
    intercept = networkMocker.intercept.bind(undefined, 'GET', '/payments/tr_WDqYK6vllg');
  });

  test('header', async () => {
    const interceptor = networkMocker.intercept('POST', '/payments', 200, paymentResponse);
    // Limit the interceptor to requests with the Idempotency-Key header.
    interceptor.matchHeader('Idempotency-Key', /^[\w+/]{24,}$/);

    const paymentPromise = observePromise(
      mollieClient.payments.create({
        amount: {
          value: '10.00',
          currency: 'EUR',
        },
        description: 'Order #12345',
        metadata: {
          order_id: '12345',
        },
        locale: Locale.nl_NL,
        restrictPaymentMethodsToCountry: 'NL',
        profileId: 'pfl_QkEhN94Ba',
        sequenceType: SequenceType.oneoff,
        redirectUrl: 'https://webshop.example.org/order/12345/',
        webhookUrl: 'https://webshop.example.org/payments/webhook/',
      }),
    );

    // Expect the network request to have been intercepted, proving the Idempotency-Key header was set.
    await tick();
    expect(interceptor).toBeDepleted();
    expect(paymentPromise).toBeFulfilledWith(expect.objectContaining({ id: 'tr_WDqYK6vllg' }));
  });

  test('500-then-200', async () => {
    const errorInterceptor = intercept(500, {
      status: 500,
      title: 'Internal Server Error',
      detail: 'Mock error',
    });
    const successInterceptor = intercept(200, paymentResponse);

    jest.useFakeTimers();

    const paymentPromise = observePromise(mollieClient.payments.get('tr_WDqYK6vllg'));

    // Expect the first network request to have been made, and the promise to be pending.
    await tick();
    expect(errorInterceptor).toBeDepleted();
    expect(successInterceptor).not.toBeDepleted();
    expect(paymentPromise).toBePending();

    // Expect the second network request to have been made after two seconds, and the promise to have fulfilled.
    jest.advanceTimersByTime(2e3);
    await tick();
    expect(successInterceptor).toBeDepleted();
    expect(paymentPromise).toBeFulfilledWith(expect.objectContaining({ id: 'tr_WDqYK6vllg' }));

    jest.useRealTimers();
  });

  test('401', () => {
    // The client should not make another attempt if the first attempt results in a 401.

    intercept(401, {
      status: 401,
      title: 'Unauthorized',
      detail: 'Mock error',
    });

    const payment = mollieClient.payments.get('tr_WDqYK6vllg');
    return expect(payment).rejects.toThrow(expect.objectContaining({ message: 'Mock error' }));
  });

  test('consistent-500', async () => {
    const interceptor = intercept(500, {
      status: 500,
      title: 'Internal Server Error',
      detail: 'Mock error',
    }).thrice();

    jest.useFakeTimers();

    const paymentPromise = observePromise(mollieClient.payments.get('tr_WDqYK6vllg'));

    // Expect a timeout to have been scheduled for the next attempt, and the promise to be pending.
    await tick();
    expect(interceptor).not.toBeDepleted();
    expect(paymentPromise).toBePending();

    // After two seconds: expect another timeout to have been scheduled for the next attempt, and the promise to still
    // be pending.
    jest.advanceTimersByTime(2e3);
    await tick();
    expect(interceptor).not.toBeDepleted();
    expect(paymentPromise).toBePending();

    // After another two seconds: expect three network requests to have been made in total, and the promise to be
    // rejected.
    jest.advanceTimersByTime(2e3);
    await tick();
    expect(interceptor).toBeDepleted();
    expect(paymentPromise).toBeRejectedWith(expect.objectContaining({ message: 'Mock error' }));

    jest.useRealTimers();
  });

  test('respect-retry-after', async () => {
    const errorInterceptor = intercept(
      500,
      {
        status: 500,
        title: 'Internal Server Error',
        detail: 'Mock error',
      },
      ['Retry-After', '5'],
    );
    const successInterceptor = intercept(200, paymentResponse);

    jest.useFakeTimers();

    const paymentPromise = observePromise(mollieClient.payments.get('tr_WDqYK6vllg'));

    // Expect the first network request to have been made, and the promise to be pending.
    await tick();
    expect(errorInterceptor).toBeDepleted();
    expect(successInterceptor).not.toBeDepleted();
    expect(paymentPromise).toBePending();

    // Expect the client to respect the five-second Retry-After header, and thus nothing having changed after two
    // seconds.
    jest.advanceTimersByTime(2e3);
    await tick();
    expect(errorInterceptor).toBeDepleted();
    expect(successInterceptor).not.toBeDepleted();
    expect(paymentPromise).toBePending();

    // Expect the second network request to have been made after two seconds, and the promise to have fulfilled.
    jest.advanceTimersByTime(3e3);
    await tick();
    expect(successInterceptor).toBeDepleted();
    expect(paymentPromise).toBeFulfilledWith(expect.objectContaining({ id: 'tr_WDqYK6vllg' }));

    jest.useRealTimers();
  });

  test('consistent-header', async () => {
    const errorInterceptor = networkMocker.intercept('POST', '/payments', 500, {
      status: 500,
      title: 'Internal Server Error',
      detail: 'Mock error',
    });
    // Steal the idempotency key from the header for later.
    let idempotencyKey: string | undefined;
    errorInterceptor.matchHeader(
      'Idempotency-Key',
      apply(/^[\w+/]{24,}$/, idempotencyKeyStealer => {
        idempotencyKeyStealer.test = (candidate: string) =>
          apply(RegExp.prototype.test.call(idempotencyKeyStealer, candidate), result => {
            if (result) {
              idempotencyKey = candidate;
            }
          });
      }),
    );

    jest.useFakeTimers();

    const paymentPromise = observePromise(
      mollieClient.payments.create({
        amount: {
          value: '10.00',
          currency: 'EUR',
        },
        description: 'Order #12345',
        metadata: {
          order_id: '12345',
        },
        locale: Locale.nl_NL,
        restrictPaymentMethodsToCountry: 'NL',
        profileId: 'pfl_QkEhN94Ba',
        sequenceType: SequenceType.oneoff,
        redirectUrl: 'https://webshop.example.org/order/12345/',
        webhookUrl: 'https://webshop.example.org/payments/webhook/',
      }),
    );

    // Expect the first network request to have been made, and the promise to be pending.
    await tick();
    expect(errorInterceptor).toBeDepleted();
    expect(paymentPromise).toBePending();

    // Add a second interceptor which expects the same Idempotency-Key header.
    const successInterceptor = networkMocker.intercept('POST', '/payments', 200, paymentResponse);
    successInterceptor.matchHeader('Idempotency-Key', idempotencyKey as string);

    // Expect the second network request to have been made after two seconds, proving the Idempotency-Key header was
    // consistent across these two network requests, and the promise to have fulfilled.
    jest.advanceTimersByTime(2e3);
    await tick();
    expect(successInterceptor).toBeDepleted();
    expect(paymentPromise).toBeFulfilledWith(expect.objectContaining({ id: 'tr_WDqYK6vllg' }));

    jest.useRealTimers();
  });

  // Potentially worth testing:
  //  * Is Axios' timeout still respected?

  afterAll(() => networkMocker.cleanup());
});
