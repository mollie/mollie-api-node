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

describe('custom-idempotency-key', () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider(true));
  let mollieClient: MollieClient;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
  });

  test('custom-idempotency-key', async () => {
    const errorInterceptor = networkMocker.intercept('POST', '/payments', 500, {
      status: 500,
      title: 'Internal Server Error',
      detail: 'Mock error',
    });
    errorInterceptor.matchHeader('Idempotency-Key', 'mock-key');
    const successInterceptor = networkMocker.intercept('POST', '/payments', 200, paymentResponse);
    successInterceptor.matchHeader('Idempotency-Key', 'mock-key');

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
        idempotencyKey: 'mock-key',
      }),
    );

    // Expect the first network request to have been made, and the promise to be pending.
    await jest.advanceTimersByTimeAsync(0); // process request
    expect(errorInterceptor).toBeDepleted();
    expect(paymentPromise).toBePending();

    // Expect the second network request to have been made after two seconds, proving the Idempotency-Key header was
    // consistent across these two network requests, and the promise to have fulfilled.
    await tick();
    await jest.advanceTimersByTimeAsync(3e3);
    await tick();
    expect(successInterceptor).toBeDepleted();
    expect(paymentPromise).toBeFulfilledWith(expect.objectContaining({ id: 'tr_WDqYK6vllg' }));

    jest.useRealTimers();
  });

  afterAll(() => networkMocker.cleanup());
});
