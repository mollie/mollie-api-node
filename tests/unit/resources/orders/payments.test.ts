import wireMockClient from '../../../wireMockClient';
import callAsync from '../../../callAsync';

function composePaymentResponse(paymentId, orderId) {
  return {
    resource: 'payment',
    id: paymentId,
    mode: 'test',
    amount: {
      currency: 'EUR',
      value: '698.00',
    },
    status: 'open',
    description: 'Order #1337 (Lego cars)',
    createdAt: '2018-12-01T17:09:02+00:00',
    method: 'banktransfer',
    metadata: null,
    orderId,
    isCancelable: true,
    locale: 'nl_NL',
    profileId: 'pfl_URR55HPMGx',
    sequenceType: 'oneoff',
    settlementAmount: {
      value: '698.00',
      currency: 'EUR',
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/orders-api/create-order-payment',
        type: 'text/html',
      },
    },
  };
}

function testPayment(payment, paymentId, paymentStatus = 'open') {
  expect(payment.resource).toBe('payment');
  expect(payment.id).toBe(paymentId);
  expect(payment.amount).toEqual({ value: '698.00', currency: 'EUR' });
  expect(payment.method).toEqual('banktransfer');

  expect(payment.status).toBe(paymentStatus);
  expect(payment.createdAt).toBe('2018-12-01T17:09:02+00:00');
  expect(payment.description).toBe('Order #1337 (Lego cars)');

  expect(payment._links.self).toEqual({
    href: `https://api.mollie.com/v2/payments/tr_WDqYK6vllg`,
    type: 'application/hal+json',
  });

  expect(payment._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/orders-api/create-order-payment',
    type: 'text/html',
  });
}

test('createOrderPayment', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/orders/ord_stTC2WHAuS/payments').reply(201, composePaymentResponse('tr_WDqYK6vllg', 'ord_stTC2WHAuS'));

  const payment = await client.orders_payments.create({
    orderId: 'ord_stTC2WHAuS',
    method: 'banktransfer',
  });

  testPayment(payment, 'tr_WDqYK6vllg');
});
