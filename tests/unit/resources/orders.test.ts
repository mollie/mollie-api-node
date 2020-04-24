import wireMockClient from '../../wireMockClient';

function composeOrderResponse(orderId, orderStatus = 'created', orderNumber = '1337') {
  return {
    resource: 'order',
    id: orderId,
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
    status: orderStatus,
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
    orderNumber: orderNumber,
    locale: 'nl_NL',
    method: 'klarnapaylater',
    isCancelable: true,
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
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
        orderId: orderId,
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
        href: `https://api.mollie.com/v2/orders/${orderId}`,
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
    },
  };
}

function testOrder(order, orderId, orderStatus = 'created', orderNumber = '1337') {
  expect(order.resource).toBe('order');
  expect(order.id).toBe(orderId);
  expect(order.profileId).toBe('pfl_URR55HPMGx');
  expect(order.mode).toBe('live');
  expect(order.method).toBe('klarnapaylater');
  expect(order.createdAt).toBe('2018-08-02T09:29:56+00:00');

  expect(order.amount).toEqual({
    value: '1027.99',
    currency: 'EUR',
  });
  expect(order.amountCaptured).toEqual({
    value: '0.00',
    currency: 'EUR',
  });
  expect(order.amountRefunded).toEqual({
    value: '0.00',
    currency: 'EUR',
  });

  expect(order.metadata).toEqual({
    order_id: '1337',
    description: 'Lego cars',
  });

  expect(order.status).toBe(orderStatus);

  expect(order.billingAddress).toEqual({
    organizationName: 'Organization Name LTD.',
    streetAndNumber: 'Keizersgracht 313',
    postalCode: '1016 EE',
    city: 'Amsterdam',
    country: 'nl',
    givenName: 'Luke',
    familyName: 'Skywalker',
    email: 'luke@skywalker.com',
  });

  expect(order.shippingAddress).toEqual({
    organizationName: 'Organization Name LTD.',
    streetAndNumber: 'Keizersgracht 313',
    postalCode: '1016 EE',
    city: 'Amsterdam',
    country: 'nl',
    givenName: 'Luke',
    familyName: 'Skywalker',
    email: 'luke@skywalker.com',
  });

  expect(order.orderNumber).toBe(orderNumber);
  expect(order.locale).toBe('nl_NL');

  expect(order.redirectUrl).toBe('https://example.org/redirect');
  expect(order.webhookUrl).toBe('https://example.org/webhook');

  expect(order._links.self).toEqual({
    href: `https://api.mollie.com/v2/orders/${orderId}`,
    type: 'application/hal+json',
  });
  expect(order._links.checkout).toEqual({
    href: 'https://www.mollie.com/payscreen/select-method/7UhSN1zuXS',
    type: 'text/html',
  });
  expect(order._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/orders-api/get-order',
    type: 'text/html',
  });

  expect(order.lines[0]).toEqual({
    resource: 'orderline',
    id: 'odl_dgtxyl',
    orderId: orderId,
    name: 'LEGO 42083 Bugatti Chiron',
    productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
    imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
    sku: '5702016116977',
    type: 'physical',
    status: 'created',
    isCancelable: true,
    quantity: 2,
    unitPrice: { value: '399.00', currency: 'EUR' },
    vatRate: '21.00',
    vatAmount: { value: '121.14', currency: 'EUR' },
    discountAmount: { value: '100.00', currency: 'EUR' },
    totalAmount: { value: '698.00', currency: 'EUR' },
    createdAt: '2018-08-02T09:29:56+00:00',
  });

  expect(order.lines[1]).toEqual({
    resource: 'orderline',
    id: 'odl_jp31jz',
    orderId: orderId,
    name: 'LEGO 42056 Porsche 911 GT3 RS',
    productUrl: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
    imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
    sku: '5702015594028',
    type: 'digital',
    status: 'created',
    isCancelable: true,
    quantity: 1,
    unitPrice: { value: '329.99', currency: 'EUR' },
    vatRate: '21.00',
    vatAmount: { value: '57.27', currency: 'EUR' },
    totalAmount: { value: '329.99', currency: 'EUR' },
    createdAt: '2018-08-02T09:29:56+00:00',
  });
}

test('createOrder', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/orders').reply(201, composeOrderResponse('ord_pbjz8x'));

  const order = await bluster(client.orders.create.bind(client.orders))({
    amount: {
      value: '1027.99',
      currency: 'EUR',
    },
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
    metadata: {
      order_id: '1337',
      description: 'Lego cars',
    },
    consumerDateOfBirth: '1958-01-31',
    locale: 'nl_NL',
    orderNumber: '1337',
    redirectUrl: 'https://example.org/redirect',
    webhookUrl: 'https://example.org/webhook',
    method: 'klarnapaylater',
    lines: [
      {
        sku: '5702016116977',
        name: 'LEGO 42083 Bugatti Chiron',
        productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
        imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
        quantity: 2,
        vatRate: '21.00',
        unitPrice: {
          currency: 'EUR',
          value: '399.00',
        },
        totalAmount: {
          currency: 'EUR',
          value: '698.00',
        },
        discountAmount: {
          currency: 'EUR',
          value: '100.00',
        },
        vatAmount: {
          currency: 'EUR',
          value: '121.14',
        },
      },
      {
        type: 'digital',
        sku: '5702015594028',
        name: 'LEGO 42056 Porsche 911 GT3 RS',
        productUrl: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
        imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
        quantity: 1,
        vatRate: '21.00',
        unitPrice: {
          currency: 'EUR',
          value: '329.99',
        },
        totalAmount: {
          currency: 'EUR',
          value: '329.99',
        },
        vatAmount: {
          currency: 'EUR',
          value: '57.27',
        },
      },
    ],
  });

  testOrder(order, 'ord_pbjz8x');
});

test('getOrder', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/orders/ord_pbjz8x').reply(200, composeOrderResponse('ord_pbjz8x'));

  const order = await bluster(client.orders.get.bind(client.orders))('ord_pbjz8x');

  testOrder(order, 'ord_pbjz8x');
});

test('getOrderIncludingPayments', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/orders/ord_kEn1PlbGa?embed=payments').reply(200, {
    resource: 'order',
    id: 'ord_kEn1PlbGa',
    profileId: 'pfl_URR55HPMGx',
    method: 'klarnapaylater',
    amount: {
      value: '1027.99',
      currency: 'EUR',
    },
    status: 'created',
    isCancelable: true,
    metadata: null,
    createdAt: '2018-08-02T09:29:56+00:00',
    expiresAt: '2018-08-30T09:29:56+00:00',
    mode: 'live',
    locale: 'nl_NL',
    billingAddress: {
      organizationName: 'Mollie B.V.',
      streetAndNumber: 'Keizersgracht 313',
      postalCode: '1016 EE',
      city: 'Amsterdam',
      country: 'nl',
      givenName: 'Luke',
      familyName: 'Skywalker',
      email: 'luke@skywalker.com',
    },
    orderNumber: '18475',
    shippingAddress: {
      organizationName: 'Mollie B.V.',
      streetAndNumber: 'Keizersgracht 313',
      postalCode: '1016 EE',
      city: 'Amsterdam',
      country: 'nl',
      givenName: 'Luke',
      familyName: 'Skywalker',
      email: 'luke@skywalker.com',
    },
    redirectUrl: 'https://example.org/redirect',
    lines: [
      {
        resource: 'orderline',
        id: 'odl_dgtxyl',
        orderId: 'ord_pbjz8x',
        name: 'LEGO 42083 Bugatti Chiron',
        sku: '5702016116977',
        type: 'physical',
        status: 'created',
        metadata: null,
        isCancelable: false,
        quantity: 2,
        quantityShipped: 0,
        amountShipped: {
          value: '0.00',
          currency: 'EUR',
        },
        quantityRefunded: 0,
        amountRefunded: {
          value: '0.00',
          currency: 'EUR',
        },
        quantityCanceled: 0,
        amountCanceled: {
          value: '0.00',
          currency: 'EUR',
        },
        shippableQuantity: 0,
        refundableQuantity: 0,
        cancelableQuantity: 0,
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
        _links: {
          productUrl: {
            href: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
            type: 'text/html',
          },
          imageUrl: {
            href: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
            type: 'text/html',
          },
        },
      },
      {
        resource: 'orderline',
        id: 'odl_jp31jz',
        orderId: 'ord_pbjz8x',
        name: 'LEGO 42056 Porsche 911 GT3 RS',
        sku: '5702015594028',
        type: 'physical',
        status: 'created',
        metadata: null,
        isCancelable: false,
        quantity: 1,
        quantityShipped: 0,
        amountShipped: {
          value: '0.00',
          currency: 'EUR',
        },
        quantityRefunded: 0,
        amountRefunded: {
          value: '0.00',
          currency: 'EUR',
        },
        quantityCanceled: 0,
        amountCanceled: {
          value: '0.00',
          currency: 'EUR',
        },
        shippableQuantity: 0,
        refundableQuantity: 0,
        cancelableQuantity: 0,
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
        _links: {
          productUrl: {
            href: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
            type: 'text/html',
          },
          imageUrl: {
            href: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
            type: 'text/html',
          },
        },
      },
    ],
    _embedded: {
      payments: [
        {
          resource: 'payment',
          id: 'tr_ncaPcAhuUV',
          mode: 'live',
          createdAt: '2018-09-07T12:00:05+00:00',
          amount: {
            value: '1027.99',
            currency: 'EUR',
          },
          description: 'Order #1337 (Lego cars)',
          method: null,
          metadata: null,
          status: 'open',
          isCancelable: false,
          locale: 'nl_NL',
          profileId: 'pfl_URR55HPMGx',
          orderId: 'ord_kEn1PlbGa',
          sequenceType: 'oneoff',
          redirectUrl: 'https://example.org/redirect',
          _links: {
            self: {
              href: 'https://api.mollie.com/v2/payments/tr_ncaPcAhuUV',
              type: 'application/hal+json',
            },
            checkout: {
              href: 'https://www.mollie.com/payscreen/select-method/ncaPcAhuUV',
              type: 'text/html',
            },
            order: {
              href: 'https://api.mollie.com/v2/orders/ord_kEn1PlbGa',
              type: 'application/hal+json',
            },
          },
        },
      ],
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/orders/ord_pbjz8x',
        type: 'application/hal+json',
      },
      checkout: {
        href: 'https://www.mollie.com/payscreen/order/checkout/pbjz8x',
        type: 'text/html',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/orders-api/get-order',
        type: 'text/html',
      },
    },
  });

  const order = await bluster(client.orders.get.bind(client.orders))('ord_kEn1PlbGa', { embed: ['payments'] });

  expect(order.id).toBe('ord_kEn1PlbGa');

  const { payments } = order._embedded;

  const payment = payments[0];
  expect(payment.id).toBe('tr_ncaPcAhuUV');
  expect(payment.createdAt).toBe('2018-09-07T12:00:05+00:00');
  expect(payment.amount).toEqual({ value: '1027.99', currency: 'EUR' });
  expect(payment.description).toBe('Order #1337 (Lego cars)');
  expect(payment.method).toBeNull();
  expect(payment.metadata).toBeNull();
  expect(payment.status).toBe('open');
  expect(payment.isCancelable).toBe(false);
  expect(payment.locale).toBe('nl_NL');
  expect(payment.profileId).toBe('pfl_URR55HPMGx');
  expect(payment.orderId).toBe('ord_kEn1PlbGa');
  expect(payment.sequenceType).toBe('oneoff');
  expect(payment.redirectUrl).toBe('https://example.org/redirect');
  expect(payment._links.self).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_ncaPcAhuUV',
    type: 'application/hal+json',
  });
  expect(payment._links.checkout).toEqual({
    href: 'https://www.mollie.com/payscreen/select-method/ncaPcAhuUV',
    type: 'text/html',
  });
  expect(payment._links.order).toEqual({
    href: 'https://api.mollie.com/v2/orders/ord_kEn1PlbGa',
    type: 'application/hal+json',
  });
});

test('listOrders', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/orders').reply(200, {
    count: 3,
    _embedded: {
      orders: [composeOrderResponse('ord_pbjz1x'), composeOrderResponse('ord_pbjz2y'), composeOrderResponse('ord_pbjz3z')],
    },
    _links: {
      self: {
        href: 'https://api.mollie.com/v2/orders',
        type: 'application/hal+json',
      },
      previous: null,
      next: {
        href: 'https://api.mollie.com/v2/orders?from=ord_stTC2WHAuS',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/orders-api/list-orders',
        type: 'text/html',
      },
    },
  });

  const orders = await client.orders.page();

  expect(orders.length).toBe(3);

  expect(orders.links.previous).toBeNull();
  expect(orders.links.self).toEqual({
    href: 'https://api.mollie.com/v2/orders',
    type: 'application/hal+json',
  });
  expect(orders.links.next).toEqual({
    href: 'https://api.mollie.com/v2/orders?from=ord_stTC2WHAuS',
    type: 'application/hal+json',
  });
  expect(orders.links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/orders-api/list-orders',
    type: 'text/html',
  });

  testOrder(orders[0], 'ord_pbjz1x');
  testOrder(orders[1], 'ord_pbjz2y');
  testOrder(orders[2], 'ord_pbjz3z');
});

test('cancelOrder', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onDelete('/orders/ord_pbjz1x').reply(200, composeOrderResponse('ord_pbjz1x', 'canceled'));

  const order = await bluster(client.orders.cancel.bind(client.orders))('ord_pbjz1x');

  testOrder(order, 'ord_pbjz1x', 'canceled');
});

test('updateOrder', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPatch('/orders/ord_pbjz8x').reply(200, composeOrderResponse('ord_pbjz8x', 'created', '16738'));

  const order = await bluster(client.orders.update.bind(client.orders))('ord_pbjz8x', {
    orderNumber: '16738',
    billingAddress: {
      organizationName: 'Organization Name LTD.',
      streetAndNumber: 'Keizersgracht 313',
      city: 'Amsterdam',
      region: 'Noord-Holland',
      postalCode: '1234AB',
      country: 'NL',
      title: 'Dhr',
      givenName: 'Piet',
      familyName: 'Mondriaan',
      email: 'piet@mondriaan.com',
      phone: '+31208202070',
    },
  });

  testOrder(order, 'ord_pbjz8x', 'created', '16738');
});
