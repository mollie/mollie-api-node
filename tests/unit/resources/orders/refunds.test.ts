import NetworkMocker, { getApiKeyClientProvider } from '../../../NetworkMocker';

function composeRefundResponse(refundId, orderId) {
  return {
    resource: 'refund',
    id: refundId,
    amount: {
      currency: 'EUR',
      value: '698.00',
    },
    status: 'pending',
    createdAt: '2018-03-19T12:33:37+00:00',
    description: 'Item not in stock, refunding',
    paymentId: 'tr_WDqYK6vllg',
    orderId: orderId,
    lines: [
      {
        resource: 'orderline',
        id: 'odl_dgtxyl',
        orderId: orderId,
        name: 'LEGO 42083 Bugatti Chiron',
        productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
        imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
        sku: '5702016116977',
        type: 'physical',
        status: 'refunded',
        quantity: 2,
        unitPrice: {
          value: '399.00',
          currency: 'EUR',
        },
        vatRate: '21.00',
        vatAmount: {
          value: '121.14',
          currency: 'EUR',
        },
        discountAmount: {
          value: '100.00',
          currency: 'EUR',
        },
        totalAmount: {
          value: '698.00',
          currency: 'EUR',
        },
        createdAt: '2018-08-02T09:29:56+00:00',
      },
    ],
    _links: {
      self: {
        href: `https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/${refundId}`,
        type: 'application/hal+json',
      },
      payment: {
        href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
        type: 'application/hal+json',
      },
      order: {
        href: `https://api.mollie.com/v2/orders/${orderId}`,
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/refunds-api/get-refund',
        type: 'text/html',
      },
    },
  };
}

function testRefund(refund, refundId, refundStatus = 'pending') {
  expect(refund.resource).toBe('refund');
  expect(refund.id).toBe(refundId);
  expect(refund.amount).toEqual({ value: '698.00', currency: 'EUR' });

  expect(refund.status).toBe(refundStatus);
  expect(refund.createdAt).toBe('2018-03-19T12:33:37+00:00');
  expect(refund.description).toBe('Item not in stock, refunding');
  expect(refund.paymentId).toBe('tr_WDqYK6vllg');

  expect(refund._links.self).toEqual({
    href: `https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/${refundId}`,
    type: 'application/hal+json',
  });

  expect(refund._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/refunds-api/get-refund',
    type: 'text/html',
  });
}

test('createPartialOrderRefund', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/orders/ord_stTC2WHAuS/refunds', 201, composeRefundResponse('re_4qqhO89gsT', 'ord_stTC2WHAuS')).twice();

    const refund = await bluster(mollieClient.orderRefunds.create.bind(mollieClient.orderRefunds))({ orderId: 'ord_stTC2WHAuS', lines: [{ id: 'odl_dgtxyl', quantity: 1 }] });

    testRefund(refund, 're_4qqhO89gsT');
  });
});

test('createCompleteOrderRefund', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/orders/ord_stTC2WHAuS/refunds', 201, composeRefundResponse('re_4qqhO89gsT', 'ord_stTC2WHAuS')).twice();

    const refund = await bluster(mollieClient.orderRefunds.create.bind(mollieClient.orderRefunds))({ orderId: 'ord_stTC2WHAuS', lines: [] });

    testRefund(refund, 're_4qqhO89gsT');
  });
});

test('listOrderRefunds', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/orders/ord_stTC2WHAuS/refunds', 200, {
      count: 1,
      _embedded: {
        refunds: [
          {
            resource: 'refund',
            id: 're_4qqhO89gsT',
            amount: {
              currency: 'EUR',
              value: '698.00',
            },
            status: 'pending',
            createdAt: '2018-03-19T12:33:37+00:00',
            description: 'Item not in stock, refunding',
            paymentId: 'tr_WDqYK6vllg',
            orderId: 'ord_pbjz8x',
            lines: [
              {
                resource: 'orderline',
                id: 'odl_dgtxyl',
                orderId: 'ord_pbjz8x',
                name: 'LEGO 42083 Bugatti Chiron',
                productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
                imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
                sku: '5702016116977',
                type: 'physical',
                status: 'refunded',
                quantity: 2,
                unitPrice: {
                  value: '399.00',
                  currency: 'EUR',
                },
                vatRate: '21.00',
                vatAmount: {
                  value: '121.14',
                  currency: 'EUR',
                },
                discountAmount: {
                  value: '100.00',
                  currency: 'EUR',
                },
                totalAmount: {
                  value: '698.00',
                  currency: 'EUR',
                },
                createdAt: '2018-08-02T09:29:56+00:00',
              },
            ],
            _links: {
              self: {
                href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT',
                type: 'application/hal+json',
              },
              payment: {
                href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
                type: 'application/hal+json',
              },
              order: {
                href: 'https://api.mollie.com/v2/orders/ord_pbjz8x',
                type: 'application/hal+json',
              },
              documentation: {
                href: 'https://docs.mollie.com/reference/v2/refunds-api/get-refund',
                type: 'text/html',
              },
            },
          },
        ],
      },
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?limit=5',
          type: 'application/hal+json',
        },
        previous: null,
        next: {
          href: 'https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds?from=re_APBiGPH2vV&limit=5',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/orders-api/list-order-refunds',
          type: 'text/html',
        },
      },
    }).twice();

    const refunds = await bluster(mollieClient.orderRefunds.page.bind(mollieClient.orderRefunds))({ orderId: 'ord_stTC2WHAuS' });

    expect(refunds.length).toBe(1);

    testRefund(refunds[0], 're_4qqhO89gsT');
  });
});
