import { Refund } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function getRefund(status) {
  return new NetworkMocker(getApiKeyClientProvider()).use(([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/refunds', 200, {
      _embedded: {
        refunds: [
          {
            resource: 'refund',
            id: 're_haCsig5aru',
            amount: {
              value: '2.00',
              currency: 'EUR',
            },
            status,
            createdAt: '2018-03-28T10:56:10+00:00',
            description: 'My first API payment',
            paymentId: 'tr_44aKxzEbr8',
            settlementAmount: {
              value: '-2.00',
              currency: 'EUR',
            },
            _links: {
              self: {
                href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/refunds/re_haCsig5aru',
                type: 'application/hal+json',
              },
              payment: {
                href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
                type: 'application/hal+json',
              },
            },
          },
        ],
      },
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/refunds-api/list-refunds',
          type: 'text/html',
        },
        self: {
          href: 'http://api.mollie.nl/v2/refunds?limit=10',
          type: 'application/hal+json',
        },
        previous: null,
        next: null,
      },
      count: 1,
    }).twice();

    return bluster(mollieClient.refunds.page.bind(mollieClient.refunds))().then(refunds => refunds[0]);
  });
}

test('refundStatuses', () => {
  return Promise.all(
    ['pending', 'processing', 'queued', 'refunded'].map(async status => {
      const refund = await getRefund(status);

      expect(refund.status).toBe(status);
    }),
  );
});
