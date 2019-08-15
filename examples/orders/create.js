/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/create-order
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const order = await mollieClient.orders.create({
      amount: {
        value: '1027.99',
        currency: 'EUR',
      },
      billingAddress: {
        organizationName: 'Mollie B.V.',
        streetAndNumber: 'Keizersgracht 313',
        city: 'Amsterdam',
        region: 'Noord-Holland',
        postalCode: '1234AB',
        country: 'NL',
        title: 'Dhr.',
        givenName: 'Piet',
        familyName: 'Mondriaan',
        email: 'piet@mondriaan.com',
        phone: '+31309202070',
      },
      shippingAddress: {
        organizationName: 'Mollie B.V.',
        streetAndNumber: 'Prinsengracht 313',
        streetAdditional: '4th floor',
        city: 'Haarlem',
        region: 'Noord-Holland',
        postalCode: '5678AB',
        country: 'NL',
        title: 'Mr.',
        givenName: 'Chuck',
        familyName: 'Norris',
        email: 'norris@chucknorrisfacts.net',
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
          type: 'physical',
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
          type: 'physical',
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

    console.log(order);
  } catch (e) {
    console.log(e);
  }
})();
