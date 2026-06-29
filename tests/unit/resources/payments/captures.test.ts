import { CaptureEmbed, CaptureInclude, CaptureStatus } from '../../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../../NetworkMocker';

function composeCaptureResponse(paymentId = 'tr_WDqYK6vllg', captureId = 'cpt_4qqhO89gsT') {
  return {
    resource: 'capture',
    id: captureId,
    mode: 'live',
    description: 'Capture for cart #12345',
    amount: {
      value: '1027.99',
      currency: 'EUR',
    },
    settlementAmount: {
      value: '399.00',
      currency: 'EUR',
    },
    status: CaptureStatus.pending,
    metadata: '{"bookkeeping_id":12345}',
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

function testCapture(capture, paymentId = 'tr_WDqYK6vllg', captureId = 'cpt_4qqhO89gsT') {
  expect(capture.resource).toBe('capture');
  expect(capture.id).toBe(captureId);
  expect(capture.mode).toBe('live');
  expect(capture.description).toBe('Capture for cart #12345');
  expect(capture.paymentId).toBe(paymentId);
  expect(capture.shipmentId).toBe('shp_3wmsgCJN4U');
  expect(capture.settlementId).toBe('stl_jDk30akdN');

  expect(capture.amount).toEqual({ value: '1027.99', currency: 'EUR' });
  expect(capture.settlementAmount).toEqual({ value: '399.00', currency: 'EUR' });

  expect(capture.status).toBe('pending');
  expect(capture.metadata).toBe('{"bookkeeping_id":12345}');

  expect(capture.createdAt).toBe('2018-08-02T09:29:56+00:00');

  expect(capture._links.self).toEqual({
    href: `https://api.mollie.com/v2/payments/${paymentId}/captures/${captureId}`,
    type: 'application/hal+json',
  });

  expect(capture._links.payment).toEqual({
    href: `https://api.mollie.com/v2/payments/${paymentId}`,
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

test('createCapture', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/payments/tr_WDqYK6vllg/captures', 200, composeCaptureResponse('tr_7UhSN1zuXS', 'cpt_mNepDkEtco6ah3QNPUGYH')).twice();

    const capture = await bluster(mollieClient.paymentCaptures.create.bind(mollieClient.paymentCaptures))({ paymentId: 'tr_WDqYK6vllg' });

    testCapture(capture, 'tr_7UhSN1zuXS', 'cpt_mNepDkEtco6ah3QNPUGYH');
  });
});

test('getCapture', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT', 200, composeCaptureResponse('tr_WDqYK6vllg', 'cpt_4qqhO89gsT')).twice();

    const capture = await bluster(mollieClient.paymentCaptures.get.bind(mollieClient.paymentCaptures))('cpt_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });

    expect(typeof capture.getPayment).toBe('function');
    expect(typeof capture.getSettlement).toBe('function');
    expect(typeof capture.getShipment).toBe('function');

    testCapture(capture);
  });
});

test('listCaptures', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/payments/tr_WDqYK6vllg/captures', 200, {
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
      })
      .twice();

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

test('getCaptureEmbeddingPayment', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    // nock only replies on an exact path+query match, so this asserts the SDK sends `?embed=payment`.
    networkMocker.intercept('GET', '/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT?embed=payment', 200, composeCaptureResponse()).twice();

    const capture = await bluster(mollieClient.paymentCaptures.get.bind(mollieClient.paymentCaptures))('cpt_4qqhO89gsT', {
      paymentId: 'tr_WDqYK6vllg',
      embed: [CaptureEmbed.payment],
    });

    testCapture(capture);
  });
});

test('getCaptureMappingDeprecatedIncludeOntoEmbed', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    // The deprecated `include` parameter must be sent as `embed`, not `include`.
    networkMocker.intercept('GET', '/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT?embed=payment', 200, composeCaptureResponse()).twice();

    const capture = await bluster(mollieClient.paymentCaptures.get.bind(mollieClient.paymentCaptures))('cpt_4qqhO89gsT', {
      paymentId: 'tr_WDqYK6vllg',
      include: [CaptureInclude.payment],
    });

    testCapture(capture);
  });
});

test('listCapturesEmbeddingPayment', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/payments/tr_WDqYK6vllg/captures?embed=payment', 200, {
        _embedded: {
          captures: [composeCaptureResponse('tr_WDqYK6vllg', 'cpt_4qqhO89gsT')],
        },
        count: 1,
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/list-captures',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.dev/v2/payments/tr_WDqYK6vllg/captures?embed=payment',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();

    const paymentCaptures = mollieClient.paymentCaptures;
    // `all` and `list` are non-enumerable aliases holding the same function reference as `page`, so they carry the embed fix too.
    expect((paymentCaptures as any).all).toBe(paymentCaptures.page);
    expect((paymentCaptures as any).list).toBe(paymentCaptures.page);

    const captures = await bluster(paymentCaptures.page.bind(paymentCaptures))({
      paymentId: 'tr_WDqYK6vllg',
      embed: [CaptureEmbed.payment],
    });

    expect(captures.length).toBe(1);
    testCapture(captures[0]);
  });
});
