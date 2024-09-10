import { Order } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function getOrder(status, additionalLinks?: object) {
  return new NetworkMocker(getApiKeyClientProvider()).use(([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/orders/ord_pbjz1x', 200, {
      resource: 'order',
      id: 'ord_pbjz1x',
      profileId: 'pfl_URR55HPMGx',
      amount: {
        value: '1027.99',
        currency: 'EUR',
      },
      amountCaptured: {
        value: '0.00',
        currency: 'EUR',
      },
      amountRefunded: {
        value: '0.00',
        currency: 'EUR',
      },
      status,
      metadata: {
        order_id: '1337',
        description: 'Lego cars',
      },
      consumerDateOfBirth: '1958-01-31',
      createdAt: '2018-08-02T09:29:56+00:00',
      mode: 'live',
      billingAddress: {
        organizationName: 'Organization Name LTD.',
        streetAndNumber: 'Keizersgracht 313',
        postalCode: '1016 EE',
        city: 'Amsterdam',
        country: 'nl',
        givenName: 'Luke',
        familyName: 'Skywalker',
        email: 'luke@skywalker.com',
      },
      shippingAddress: {
        organizationName: 'Organization Name LTD.',
        streetAndNumber: 'Keizersgracht 313',
        postalCode: '1016 EE',
        city: 'Amsterdam',
        country: 'nl',
        givenName: 'Luke',
        familyName: 'Skywalker',
        email: 'luke@skywalker.com',
      },
      orderNumber: '1337',
      locale: 'nl_NL',
      method: 'klarnapaylater',
      isCancelable: true,
      redirectUrl: 'https://example.org/redirect',
      cancelUrl: 'https://example.org/cancel',
      webhookUrl: 'https://example.org/webhook',
      lines: [
        {
          resource: 'orderline',
          id: 'odl_dgtxyl',
          orderId: '1337',
          name: 'LEGO 42083 Bugatti Chiron',
          productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
          imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
          sku: '5702016116977',
          type: 'physical',
          status: 'created',
          isCancelable: true,
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
        {
          resource: 'orderline',
          id: 'odl_jp31jz',
          orderId: '1337',
          name: 'LEGO 42056 Porsche 911 GT3 RS',
          productUrl: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
          imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
          sku: '5702015594028',
          type: 'digital',
          status: 'created',
          isCancelable: true,
          quantity: 1,
          unitPrice: {
            value: '329.99',
            currency: 'EUR',
          },
          vatRate: '21.00',
          vatAmount: {
            value: '57.27',
            currency: 'EUR',
          },
          totalAmount: {
            value: '329.99',
            currency: 'EUR',
          },
          createdAt: '2018-08-02T09:29:56+00:00',
        },
      ],
      _links: {
        self: {
          href: `https://api.mollie.com/v2/orders/1337`,
          type: 'application/hal+json',
        },
        checkout: {
          href: 'https://www.mollie.com/payscreen/select-method/7UhSN1zuXS',
          type: 'text/html',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/orders-api/get-order',
          type: 'text/html',
        },
        ...additionalLinks,
      },
    }).twice();

    return bluster(mollieClient.orders.get.bind(mollieClient.orders))('ord_pbjz1x');
  });
}

// These helper methods are not yet implemented for orders.
test('orderStatuses', () => {
  return Promise.all(
    [
      ['created', 'isCreated', true],
      ['created', 'isPaid', false],
      ['created', 'isAuthorized', false],
      ['created', 'isCanceled', false],
      ['created', 'isShipping', false],
      ['created', 'isCompleted', false],
      ['created', 'isExpired', false],
      ['created', 'isPending', false],

      ['paid', 'isCreated', false],
      ['paid', 'isPaid', true],
      ['paid', 'isAuthorized', false],
      ['paid', 'isCanceled', false],
      ['paid', 'isShipping', false],
      ['paid', 'isCompleted', false],
      ['paid', 'isExpired', false],
      ['paid', 'isPending', false],

      ['authorized', 'isCreated', false],
      ['authorized', 'isPaid', false],
      ['authorized', 'isAuthorized', true],
      ['authorized', 'isCanceled', false],
      ['authorized', 'isShipping', false],
      ['authorized', 'isCompleted', false],
      ['authorized', 'isExpired', false],
      ['authorized', 'isPending', false],

      ['canceled', 'isCreated', false],
      ['canceled', 'isPaid', false],
      ['canceled', 'isAuthorized', false],
      ['canceled', 'isCanceled', true],
      ['canceled', 'isShipping', false],
      ['canceled', 'isCompleted', false],
      ['canceled', 'isExpired', false],
      ['canceled', 'isPending', false],

      ['shipping', 'isCreated', false],
      ['shipping', 'isPaid', false],
      ['shipping', 'isAuthorized', false],
      ['shipping', 'isCanceled', false],
      ['shipping', 'isShipping', true],
      ['shipping', 'isCompleted', false],
      ['shipping', 'isExpired', false],
      ['shipping', 'isPending', false],

      ['completed', 'isCreated', false],
      ['completed', 'isPaid', false],
      ['completed', 'isAuthorized', false],
      ['completed', 'isCanceled', false],
      ['completed', 'isShipping', false],
      ['completed', 'isCompleted', true],
      ['completed', 'isExpired', false],
      ['completed', 'isPending', false],

      ['expired', 'isCreated', false],
      ['expired', 'isPaid', false],
      ['expired', 'isAuthorized', false],
      ['expired', 'isCanceled', false],
      ['expired', 'isShipping', false],
      ['expired', 'isCompleted', false],
      ['expired', 'isExpired', true],
      ['expired', 'isPending', false],

      ['pending', 'isCreated', false],
      ['pending', 'isPaid', false],
      ['pending', 'isAuthorized', false],
      ['pending', 'isCanceled', false],
      ['pending', 'isShipping', false],
      ['pending', 'isCompleted', false],
      ['pending', 'isExpired', false],
      ['pending', 'isPending', true],
    ].map(async ([status, method, expectedResult]) => {
      const order = await getOrder(status);

      expect(order[method as keyof Order]()).toBe(expectedResult);
    }),
  );
});

test('orderGetCheckoutUrl', async () => {
  const order = await getOrder('created', {
    checkout: {
      href: 'https://example.org/checkout',
      type: 'text/html',
    },
  });

  expect(order.getCheckoutUrl()).toBe('https://example.org/checkout');
});
