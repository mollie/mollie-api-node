import wireMockClient from '../../../wireMockClient';

function composeShipmentResponse(shipmentId, orderId, orderlineStatus = 'shipping') {
  return {
    resource: 'shipment',
    id: shipmentId,
    orderId: orderId,
    createdAt: '2018-08-02T09:29:56+00:00',
    profileId: 'pfl_URR55HPMGx',
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
        status: orderlineStatus,
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
        status: orderlineStatus,
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
        href: `https://api.mollie.com/v2/orders/${orderId}/shipments/${shipmentId}`,
        type: 'application/hal+json',
      },
      order: {
        href: `https://api.mollie.com/v2/orders/${orderId}`,
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/shipments-api/get-shipment',
        type: 'text/html',
      },
    },
  };
}

function testShipment(shipment, shipmentId, orderId) {
  expect(shipment.resource).toBe('shipment');
  expect(shipment.orderId).toBe(orderId);
  expect(shipment.createdAt).toBe('2018-08-02T09:29:56+00:00');
  expect(shipment._links.self).toEqual({
    href: `https://api.mollie.com/v2/orders/ord_pbjz8x/shipments/${shipmentId}`,
    type: 'application/hal+json',
  });
  expect(shipment._links.order).toEqual({
    href: 'https://api.mollie.com/v2/orders/ord_pbjz8x',
    type: 'application/hal+json',
  });
  expect(shipment._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/shipments-api/get-shipment',
    type: 'text/html',
  });

  const line0 = shipment.lines[0];
  expect(line0.resource).toBe('orderline');
  expect(line0.id).toBe('odl_dgtxyl');
  expect(line0.orderId).toBe('ord_pbjz8x');
  expect(line0.name).toBe('LEGO 42083 Bugatti Chiron');
  expect(line0.productUrl).toBe('https://shop.lego.com/nl-NL/Bugatti-Chiron-42083');
  expect(line0.imageUrl).toBe('https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$');
  expect(line0.sku).toBe('5702016116977');
  expect(line0.type).toBe('physical');
  expect(line0.status).toBe('shipping');
  expect(line0.quantity).toBe(2);
  expect(line0.createdAt).toBe('2018-08-02T09:29:56+00:00');
  expect(line0.vatRate).toBe('21.00');
  expect(line0.vatAmount).toEqual({ value: '121.14', currency: 'EUR' });
  expect(line0.unitPrice).toEqual({ value: '399.00', currency: 'EUR' });
  expect(line0.discountAmount).toEqual({ value: '100.00', currency: 'EUR' });
  expect(line0.totalAmount).toEqual({ value: '698.00', currency: 'EUR' });

  const line1 = shipment.lines[1];
  expect(line1.resource).toBe('orderline');
  expect(line1.id).toBe('odl_jp31jz');
  expect(line1.orderId).toBe('ord_pbjz8x');
  expect(line1.name).toBe('LEGO 42056 Porsche 911 GT3 RS');
  expect(line1.productUrl).toBe('https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056');
  expect(line1.imageUrl).toBe('https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$');
  expect(line1.sku).toBe('5702015594028');
  expect(line1.type).toBe('digital');
  expect(line1.status).toBe('shipping');
  expect(line1.quantity).toBe(1);
  expect(line1.createdAt).toBe('2018-08-02T09:29:56+00:00');
  expect(line1.vatRate).toBe('21.00');
  expect(line1.vatAmount).toEqual({ value: '57.27', currency: 'EUR' });
  expect(line1.unitPrice).toEqual({ value: '329.99', currency: 'EUR' });
  expect(line1.totalAmount).toEqual({ value: '329.99', currency: 'EUR' });
}

test('createShipment', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onPost('/orders/ord_pbjz8x/shipments').reply(201, composeShipmentResponse('shp_3wmsgCJN4U', 'ord_pbjz8x'));

  const shipment = await bluster(client.orderShipments.create.bind(client.orderShipments))({
    orderId: 'ord_pbjz8x',
    lines: [
      {
        id: 'odl_dgtxyl',
        quantity: 1,
      },
      { id: 'odl_jp31jz' },
    ],
  });

  testShipment(shipment, 'shp_3wmsgCJN4U', 'ord_pbjz8x');
});

test('getShipment', async () => {
  const { adapter, client } = wireMockClient();

  adapter.onGet('/orders/ord_pbjz8x/shipments/shp_3wmsgCJN4U').reply(200, composeShipmentResponse('shp_3wmsgCJN4U', 'ord_pbjz8x'));

  const shipment = await bluster(client.orderShipments.get.bind(client.orderShipments))('shp_3wmsgCJN4U', { orderId: 'ord_pbjz8x' });

  testShipment(shipment, 'shp_3wmsgCJN4U', 'ord_pbjz8x');
});
