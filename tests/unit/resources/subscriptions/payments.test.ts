import wireMockClient from '../../../wireMockClient';

test('listSubscriptionPayments', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K/payments').reply(200, {
    _embedded: {
      payments: [
        {
          resource: 'payment',
          id: 'tr_DtKxVP2AgW',
          mode: 'test',
          createdAt: '2018-09-19T12:49:52+00:00',
          amount: {
            value: '10.00',
            currency: 'EUR',
          },
          description: 'Payment no 1',
          method: 'directdebit',
          metadata: null,
          status: 'pending',
          isCancelable: true,
          expiresAt: '2019-09-19T12:49:52+00:00',
          locale: 'nl_NL',
          profileId: 'pfl_rH9rQtedgS',
          customerId: 'cst_8wmqcHMN4U',
          mandateId: 'mdt_aGQNkteF6w',
          subscriptionId: 'sub_8JfGzs6v3K',
          sequenceType: 'recurring',
          redirectUrl: null,
          webhookUrl: 'https://example.org/webhook',
          settlementAmount: {
            value: '10.00',
            currency: 'EUR',
          },
          details: {
            transferReference: 'SD67-6850-2204-6029',
            creditorIdentifier: 'NL08ZZZ502057730000',
            consumerName: 'Customer A',
            consumerAccount: 'NL50INGB0006588912',
            consumerBic: 'INGBNL2A',
            dueDate: '2018-09-21',
            signatureDate: '2018-09-19',
          },
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_DtKxVP2AgW',
              type: 'application/hal+json',
            },
            checkout: null,
            customer: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U',
              type: 'application/hal+json',
            },
            mandate: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates/mdt_aGQNkteF6w',
              type: 'application/hal+json',
            },
            subscription: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K',
              type: 'application/hal+json',
            },
          },
        },
        {
          resource: 'payment',
          id: 'tr_DtKxVP2AgD',
          mode: 'test',
          createdAt: '2018-09-19T12:49:52+00:00',
          amount: {
            value: '10.00',
            currency: 'EUR',
          },
          description: 'Payment no 2',
          method: 'directdebit',
          metadata: null,
          status: 'paid',
          isCancelable: true,
          expiresAt: '2019-09-19T12:49:52+00:00',
          locale: 'nl_NL',
          profileId: 'pfl_rH9rQtedgS',
          customerId: 'cst_8wmqcHMN4U',
          mandateId: 'mdt_aGQNkteF6w',
          subscriptionId: 'sub_8JfGzs6v3K',
          sequenceType: 'recurring',
          redirectUrl: null,
          webhookUrl: 'https://example.org/webhook',
          settlementAmount: {
            value: '10.00',
            currency: 'EUR',
          },
          details: {
            transferReference: 'SD67-6850-2204-6029',
            creditorIdentifier: 'NL08ZZZ502057730000',
            consumerName: 'Customer A',
            consumerAccount: 'NL50INGB0006588912',
            consumerBic: 'INGBNL2A',
            dueDate: '2018-09-21',
            signatureDate: '2018-09-19',
          },
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_DtKxVP2AgD',
              type: 'application/hal+json',
            },
            checkout: null,
            customer: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U',
              type: 'application/hal+json',
            },
            mandate: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates/mdt_aGQNkteF6w',
              type: 'application/hal+json',
            },
            subscription: {
              href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K',
              type: 'application/hal+json',
            },
          },
        },
      ],
    },
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K/payments?limit=50',
        type: 'application/hal+json',
      },
      previous: null,
      next: null,
    },
    count: 2,
  });

  const payments = await bluster(client.subscriptions_payments.list.bind(client.subscriptions_payments))({ customerId: 'cst_8wmqcHMN4U', subscriptionId: 'sub_8JfGzs6v3K' });

  expect(payments.length).toBe(2);

  expect(payments.links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments',
    type: 'text/html',
  });

  expect(payments.links.self).toEqual({
    href: 'https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/subscriptions/sub_8JfGzs6v3K/payments?limit=50',
    type: 'application/hal+json',
  });
});
