import wireMockClient from '../../wireMockClient';
import callAsync from '../../callAsync';

test('createPayment', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/payments').reply(201, {
    resource: 'payment',
    id: 'tr_44aKxzEbr8',
    mode: 'test',
    createdAt: '2018-03-13T14:02:29+00:00',
    amount: {
      value: '20.00',
      currency: 'EUR',
    },
    description: 'My first API payment',
    method: null,
    metadata: {
      order_id: '1234',
    },
    status: 'open',
    isCancelable: false,
    expiresAt: '2018-03-13T14:17:29+00:00',
    details: null,
    profileId: 'pfl_2A1gacu42V',
    sequenceType: 'oneoff',
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
        type: 'application/hal+json',
      },
      checkout: {
        href: 'https://www.mollie.com/payscreen/select-method/44aKxzEbr8',
        type: 'text/html',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/payments-api/create-payment',
        type: 'text/html',
      },
    },
  });

  const payment = await client.payments.create({
    amount: {
      currency: 'EUR',
      value: '20.00',
    },
    description: 'My first API payment',
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
    metadata: {
      order_id: '1234',
    },
  });

  expect(payment.id).toBe('tr_44aKxzEbr8');
  expect(payment.mode).toBe('test');
  expect(payment.createdAt).toBe('2018-03-13T14:02:29+00:00');

  expect(payment.amount).toEqual({ value: '20.00', currency: 'EUR' });

  expect(payment.description).toBe('My first API payment');
  expect(payment.method).toBeNull();
  expect(payment.metadata).toEqual({ order_id: '1234' });
  expect(payment.status).toBe('open');
  expect(payment.isCancelable).toBe(false);
  expect(payment.expiresAt).toBe('2018-03-13T14:17:29+00:00');
  expect(payment.details).toBeNull();
  expect(payment.profileId).toBe('pfl_2A1gacu42V');
  expect(payment.sequenceType).toBe('oneoff');
  expect(payment.redirectUrl).toBe('https://example.org/redirect');
  expect(payment.webhookUrl).toBe('https://example.org/webhook');

  expect(payment._links.self).toEqual({ href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8', type: 'application/hal+json' });

  expect(payment._links.checkout).toEqual({ href: 'https://www.mollie.com/payscreen/select-method/44aKxzEbr8', type: 'text/html' });

  expect(payment._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/payments-api/create-payment', type: 'text/html' });
});

test('getPayment', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/payments/tr_44aKxzEbr8').reply(200, {
    resource: 'payment',
    id: 'tr_44aKxzEbr8',
    mode: 'test',
    createdAt: '2018-03-13T14:02:29+00:00',
    amount: {
      value: '20.00',
      currency: 'EUR',
    },
    description: 'My first API payment',
    method: 'ideal',
    metadata: {
      order_id: '1234',
    },
    status: 'paid',
    paidAt: '2018-03-19T12:18:35+00:00',
    amountRefunded: {
      value: '0.00',
      currency: 'EUR',
    },
    amountRemaining: {
      value: '20.00',
      currency: 'EUR',
    },
    details: {
      consumerName: 'T. TEST',
      consumerAccount: 'NL17RABO0213698412',
      consumerBic: 'TESTNL99',
    },
    locale: 'nl_NL',
    countryCode: 'NL',
    profileId: 'pfl_2A1gacu42V',
    sequenceType: 'oneoff',
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
    settlementAmount: {
      value: '20.00',
      currency: 'EUR',
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/payments-api/get-payment',
        type: 'text/html',
      },
    },
  });

  const payment = await client.payments.get('tr_44aKxzEbr8');

  expect(payment.id).toBe('tr_44aKxzEbr8');
  expect(payment.mode).toBe('test');
  expect(payment.createdAt).toBe('2018-03-13T14:02:29+00:00');

  expect(payment.amount).toEqual({ value: '20.00', currency: 'EUR' });

  expect(payment.description).toBe('My first API payment');
  expect(payment.method).toBe('ideal');
  expect(payment.metadata).toEqual({ order_id: '1234' });
  expect(payment.status).toBe('paid');

  expect(payment.amountRefunded).toEqual({ value: '0.00', currency: 'EUR' });
  expect(payment.amountRemaining).toEqual({ value: '20.00', currency: 'EUR' });
  expect(payment.details).toEqual({ consumerName: 'T. TEST', consumerAccount: 'NL17RABO0213698412', consumerBic: 'TESTNL99' });
  expect(payment.profileId).toBe('pfl_2A1gacu42V');
  expect(payment.sequenceType).toBe('oneoff');
  expect(payment.redirectUrl).toBe('https://example.org/redirect');
  expect(payment.webhookUrl).toBe('https://example.org/webhook');

  expect(payment._links.self).toEqual({ href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8', type: 'application/hal+json' });

  expect(payment._links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/payments-api/get-payment', type: 'text/html' });
});

test('listPayments', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/payments?limit=3').reply(200, {
    _embedded: {
      payments: [
        {
          resource: 'payment',
          id: 'tr_admNa2tFfa',
          mode: 'test',
          createdAt: '2018-03-19T15:00:50+00:00',
          amount: {
            value: '100.00',
            currency: 'EUR',
          },
          description: 'Payment no 1',
          method: null,
          metadata: null,
          status: 'open',
          isCancelable: false,
          expiresAt: '2018-03-19T15:15:50+00:00',
          details: null,
          locale: 'nl_NL',
          profileId: 'pfl_7N5qjbu42V',
          sequenceType: 'oneoff',
          redirectUrl: 'https://www.example.org/',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_admNa2tFfa',
              type: 'application/hal+json',
            },
            checkout: {
              href: 'https://www.mollie.com/payscreen/select-method/admNa2tFfa',
              type: 'text/html',
            },
          },
        },
        {
          resource: 'payment',
          id: 'tr_bcaLc7hFfa',
          mode: 'test',
          createdAt: '2018-03-19T15:00:50+00:00',
          amount: {
            value: '100.00',
            currency: 'EUR',
          },
          description: 'Payment no 2',
          method: null,
          metadata: null,
          status: 'open',
          isCancelable: false,
          expiresAt: '2018-03-19T15:15:50+00:00',
          details: null,
          locale: 'nl_NL',
          profileId: 'pfl_7N5qjbu42V',
          sequenceType: 'oneoff',
          redirectUrl: 'https://www.example.org/',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_bcaLc7hFfa',
              type: 'application/hal+json',
            },
            checkout: {
              href: 'https://www.mollie.com/payscreen/select-method/bcaLc7hFfa',
              type: 'text/html',
            },
          },
        },
        {
          resource: 'payment',
          id: 'tr_pslHy1tFfa',
          mode: 'test',
          createdAt: '2018-03-19T15:00:50+00:00',
          amount: {
            value: '100.00',
            currency: 'EUR',
          },
          description: 'Payment no 3',
          method: null,
          metadata: null,
          status: 'open',
          isCancelable: false,
          expiresAt: '2018-03-19T15:15:50+00:00',
          details: null,
          locale: 'nl_NL',
          profileId: 'pfl_7N5qjbu42V',
          sequenceType: 'oneoff',
          redirectUrl: 'https://www.example.org/',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_pslHy1tFfa',
              type: 'application/hal+json',
            },
            checkout: {
              href: 'https://www.mollie.com/payscreen/select-method/pslHy1tFfa',
              type: 'text/html',
            },
          },
        },
      ],
    },
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/payments-api/list-payments',
        type: 'text/html',
      },
      self: {
        href: 'http://api.mollie.com/v2/payments?limit=3',
        type: 'application/hal+json',
      },
      previous: null,
      next: {
        href: 'http://api.mollie.com/v2/payments?from=tr_eW8f5kzUkF&limit=3',
        type: 'application/hal+json',
      },
    },
    count: 3,
  });

  const payments = await client.payments.page({ limit: 3 });

  expect(payments.length).toBe(3);

  expect(payments.links.documentation).toEqual({ href: 'https://docs.mollie.com/reference/v2/payments-api/list-payments', type: 'text/html' });

  expect(payments.links.self).toEqual({ href: 'http://api.mollie.com/v2/payments?limit=3', type: 'application/hal+json' });

  expect(payments.links.previous).toBeNull();

  expect(payments.links.next).toEqual({ href: 'http://api.mollie.com/v2/payments?from=tr_eW8f5kzUkF&limit=3', type: 'application/hal+json' });
});
