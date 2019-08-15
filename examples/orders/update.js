/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/update-order
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const order = await mollieClient.orders.update('ord_kEn1PlbGa', {
      billingAddress: {
        organizationName: 'Mollie B.V.',
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

    console.log(order);
  } catch (e) {
    console.log(e);
  }
})();
