import { ApiMode, Locale, PaymentMethod, SequenceType } from '@mollie-types/global';
import Order from '@models/Order';
import { IOrder, OrderStatus } from '@mollie-types/order';
import { PaymentStatus } from '@mollie-types/payment';
import { OrderLineType } from '@mollie-types/order/line';

describe('order model', () => {
  it('should instantiate with default values', () => {
    const capture = new Order();

    expect(capture.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const orderProps: IOrder = {
      resource: 'order',
      id: 'ord_kEn1PlbGa',
      profileId: 'pfl_URR55HPMGx',
      method: PaymentMethod.ideal,
      amount: {
        value: '1027.99',
        currency: 'EUR',
      },
      status: OrderStatus.created,
      isCancelable: true,
      metadata: null,
      createdAt: '2018-08-02T09:29:56+00:00',
      expiresAt: '2018-08-30T09:29:56+00:00',
      mode: ApiMode.test,
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
          type: OrderLineType.physical,
          status: OrderStatus.created,
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
            mode: ApiMode.live,
            createdAt: '2018-09-07T12:00:05+00:00',
            amount: {
              value: '1027.99',
              currency: 'EUR',
            },
            description: 'Order #1337 (Lego cars)',
            method: null,
            metadata: null,
            status: PaymentStatus.open,
            isCancelable: false,
            locale: Locale.nl_NL,
            profileId: 'pfl_URR55HPMGx',
            orderId: 'ord_kEn1PlbGa',
            sequenceType: SequenceType.oneoff,
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
    };
    const capture = new Order(orderProps);

    expect(capture.toPlainObject()).toMatchSnapshot();
  });
});
