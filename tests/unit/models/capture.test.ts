import Capture from '../../../src/models/Capture';
import { ApiMode } from '../../../src/types/global';
import { ICapture } from '../../../src/types/payment/capture';

describe('capture model', () => {
  it('should instantiate with default values', () => {
    const capture = new Capture();

    expect(capture.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const chargebackProps: ICapture = {
      resource: 'capture',
      id: 'cpt_4qqhO89gsT',
      mode: ApiMode.live,
      amount: {
        value: '1027.99',
        currency: 'EUR'
      },
      settlementAmount: {
        value: '399.00',
        currency: 'EUR'
      },
      paymentId: 'tr_WDqYK6vllg',
      shipmentId: 'shp_3wmsgCJN4U',
      settlementId: 'stl_jDk30akdN',
      createdAt: '2018-08-02T09:29:56+00:00',
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT',
          type: 'application/hal+json',
        },
        payment: {
          href: 'https://api.mollie.com/v2/payments/tr_WDqYK6vllg',
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
    const capture = new Capture(chargebackProps);

    expect(capture.toPlainObject()).toMatchSnapshot();
  });
});
