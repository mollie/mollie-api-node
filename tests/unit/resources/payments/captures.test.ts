import NetworkMocker, { getApiKeyClientProvider } from '../../../NetworkMocker';

function composeCaptureResponse(paymentId = 'tr_WDqYK6vllg', captureId = 'cpt_4qqhO89gsT') {
  return {
    resource: 'capture',
    id: captureId,
    mode: 'live',
    amount: {
      value: '1027.99',
      currency: 'EUR',
    },
    settlementAmount: {
      value: '399.00',
      currency: 'EUR',
    },
    paymentId: paymentId,
    shipmentId: 'shp_3wmsgCJN4U',
    settlementId: 'stl_jDk30akdN',
    createdAt: '2018-08-02T09:29:56+00:00',
    _links: {
      self: {
        href: `https://api.mollie.com/v2/payments/${paymentId}/captures/${captureId}`,
        type: 'application/hal+json',
      },
      payment: {
        href: `https://api.mollie.com/v2/payments/${paymentId}`,
        type: 'application/hal+json',
      },
      shipment: {
        href: 'https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U',
        type: 'application/hal+json',
      },
      settlement: {
        href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/v2/captures-api/get-capture',
        type: 'text/html',
      },
    },
  };
}

function testCapture(capture) {
  expect(capture.resource).toBe('capture');
  expect(capture.id).toBe('cpt_4qqhO89gsT');
  expect(capture.mode).toBe('live');
  expect(capture.paymentId).toBe('tr_WDqYK6vllg');
  expect(capture.shipmentId).toBe('shp_3wmsgCJN4U');
  expect(capture.settlementId).toBe('stl_jDk30akdN');

  expect(capture.amount).toEqual({ value: '1027.99', currency: 'EUR' });
  expect(capture.settlementAmount).toEqual({ value: '399.00', currency: 'EUR' });

  expect(capture.createdAt).toBe('2018-08-02T09:29:56+00:00');

  expect(capture._links.self).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT',
    type: 'application/hal+json',
  });

  expect(capture._links.payment).toEqual({
    href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
    type: 'application/hal+json',
  });

  expect(capture._links.shipment).toEqual({
    href: 'https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U',
    type: 'application/hal+json',
  });

  expect(capture._links.settlement).toEqual({
    href: 'https://api.mollie.com/v2/settlements/stl_jDk30akdN',
    type: 'application/hal+json',
  });

  expect(capture._links.documentation).toEqual({
    href: 'https://docs.mollie.com/reference/v2/captures-api/get-capture',
    type: 'text/html',
  });
}

test('getCapture', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT', 200, composeCaptureResponse('tr_WDqYK6vllg', 'cpt_4qqhO89gsT')).twice();

    const capture = await bluster(mollieClient.paymentCaptures.get.bind(mollieClient.paymentCaptures))('cpt_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });

    testCapture(capture);
  });
});

test('listCaptures', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments/tr_WDqYK6vllg/captures', 200, {
      _embedded: {
        captures: [composeCaptureResponse('tr_WDqYK6vllg', 'cpt_4qqhO89gsT')],
      },
      count: 1,
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/captures-api/list-captures',
          type: 'text/html',
        },
        self: {
          href: 'https://api.mollie.dev/v2/payments/tr_WDqYK6vllg/captures?limit=50',
          type: 'application/hal+json',
        },
        previous: null,
        next: null,
      },
    }).twice();

    const captures = await bluster(mollieClient.paymentCaptures.page.bind(mollieClient.paymentCaptures))({ paymentId: 'tr_WDqYK6vllg' });

    expect(captures.length).toBe(1);

    expect(captures.links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/v2/captures-api/list-captures',
      type: 'text/html',
    });

    expect(captures.links.self).toEqual({
      href: 'https://api.mollie.dev/v2/payments/tr_WDqYK6vllg/captures?limit=50',
      type: 'application/hal+json',
    });

    expect(captures.links.previous).toBeNull();
    expect(captures.links.next).toBeNull();

    testCapture(captures[0]);
  });
});
