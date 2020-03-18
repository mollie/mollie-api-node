import wireMockClient from '../../wireMockClient';
import { List, Refund } from '../../..';

test('listRefunds', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/refunds').reply(200, {
    _embedded: {
      refunds: [
        {
          resource: 'refund',
          id: 're_haCsig5aru',
          amount: {
            value: '2.00',
            currency: 'EUR',
          },
          status: 'pending',
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
  });

  const refunds: List<Refund> = await client.refunds.page();

  expect(refunds.length).toBe(1);

  const refund = refunds[0];
  expect(refund.id).toBe('re_haCsig5aru');
  expect(refund.amount).toEqual({ value: '2.00', currency: 'EUR' });
  expect(refund.status).toBe('pending');
  expect(refund.createdAt).toBe('2018-03-28T10:56:10+00:00');
  expect(refund.description).toBe('My first API payment');
  expect(refund.paymentId).toBe('tr_44aKxzEbr8');
  expect(refund.settlementAmount).toEqual({ value: '-2.00', currency: 'EUR' });

  expect(refund._links.self).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/refunds/re_haCsig5aru',
    type: 'application/hal+json',
  });

  expect(refund._links.payment).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
    type: 'application/hal+json',
  });
});
