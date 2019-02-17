import Shipment from '@models/Shipment';
import { IShipment } from '@mollie-types/shipment';
import { OrderStatus } from '@mollie-types/order';
import { OrderLineType } from '@mollie-types/order/line';

describe('shipment model', () => {
  it('should instantiate with default values', () => {
    const shipment = new Shipment();

    expect(shipment.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const shipmentProps: IShipment = {
      resource: 'shipment',
      id: 'shp_3wmsgCJN4U',
      orderId: 'ord_kEn1PlbGa',
      createdAt: '2018-08-09T14:33:54+00:00',
      tracking: {
        carrier: 'PostNL',
        code: '3SKABA000000000',
        url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
      },
      lines: [
        {
          resource: 'orderline',
          id: 'odl_dgtxyl',
          orderId: 'ord_pbjz8x',
          name: 'LEGO 42083 Bugatti Chiron',
          sku: '5702016116977',
          type: OrderLineType.physical,
          status: OrderStatus.created,
          metadata: {
            order_id: '1337',
            description: 'Bugatti Chiron',
          },
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
          type: OrderLineType.physical,
          status: OrderStatus.created,
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
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/order/ord_kEn1PlbGa/shipments/shp_3wmsgCJN4U',
          type: 'application/hal+json',
        },
        order: {
          href: 'https://api.mollie.com/v2/orders/ord_kEn1PlbGa',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/shipments-api/get-shipment',
          type: 'text/html',
        },
      },
    };

    const shipment = new Shipment(shipmentProps);

    expect(shipment.toPlainObject()).toMatchSnapshot();
  });
});
