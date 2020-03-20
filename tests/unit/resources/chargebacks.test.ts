import wireMockClient from '../../wireMockClient';

function testChargeback(chargeback, paymentId, chargebackId, amount) {
  expect(chargeback.resource).toBe('chargeback');
  expect(chargeback.id).toBe(chargebackId);

  expect(chargeback.amount).toEqual({
    value: amount,
    currency: 'EUR',
  });
  expect(chargeback.settlementAmount).toEqual({
    value: amount,
    currency: 'EUR',
  });

  expect(chargeback._links.self).toEqual({
    href: `https://api.mollie.com/v2/payments/${paymentId}/chargebacks/${chargebackId}`,
    type: 'application/hal+json',
  });
  expect(chargeback._links.payment).toEqual({
    href: `https://api.mollie.com/v2/payments/${paymentId}`,
    type: 'application/hal+json',
  });
  expect(chargeback._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback',
    type: 'text/html',
  });
}

test('listChargebacks', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/chargebacks').reply(200, {
    _embedded: {
      chargebacks: [
        {
          resource: 'chargeback',
          id: 'chb_n9z0tp',
          amount: {
            value: '-13.00',
            currency: 'EUR',
          },
          createdAt: '2018-03-28T11:44:32+00:00',
          paymentId: 'tr_44aKxzEbr8',
          settlementAmount: {
            value: '-13.00',
            currency: 'EUR',
          },
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8/chargebacks/chb_n9z0tp',
              type: 'application/hal+json',
            },
            payment: {
              href: 'https://api.mollie.com/v2/payments/tr_44aKxzEbr8',
              type: 'application/hal+json',
            },
            documentation: {
              href: 'https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback',
              type: 'text/html',
            },
          },
        },
        {
          resource: 'chargeback',
          id: 'chb_6cqlwf',
          amount: {
            value: '-0.37',
            currency: 'EUR',
          },
          createdAt: '2018-03-28T11:44:32+00:00',
          paymentId: 'tr_nQKWJbDj7j',
          settlementAmount: {
            value: '-0.37',
            currency: 'EUR',
          },
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_nQKWJbDj7j/chargebacks/chb_6cqlwf',
              type: 'application/hal+json',
            },
            payment: {
              href: 'https://api.mollie.com/v2/payments/tr_nQKWJbDj7j',
              type: 'application/hal+json',
            },
            documentation: {
              href: 'https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback',
              type: 'text/html',
            },
          },
        },
      ],
    },
    _links: {
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks',
        type: 'text/html',
      },
      self: {
        href: 'https://api.mollie.com/v2/chargebacks',
        type: 'application/hal+json',
      },
    },
    count: 2,
  });

  const chargebacks = await client.chargebacks.page();

  expect(chargebacks.length).toBe(2);

  expect(chargebacks.links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks',
    type: 'text/html',
  });

  expect(chargebacks.links.self).toEqual({
    href: 'https://api.mollie.com/v2/chargebacks',
    type: 'application/hal+json',
  });

  testChargeback(chargebacks[0], 'tr_44aKxzEbr8', 'chb_n9z0tp', '-13.00');
  testChargeback(chargebacks[1], 'tr_nQKWJbDj7j', 'chb_6cqlwf', '-0.37');
});
