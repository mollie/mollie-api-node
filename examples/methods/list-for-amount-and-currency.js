/**
 * @docs https://docs.mollie.com/payments/multicurrency#filtering-payment-methods
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const filteredMethods = await mollieClient.methods.all({
      include: 'issuers',
      amount: {
        value: '10.00',
        currency: 'SEK',
      },
    });

    console.log(filteredMethods);
  } catch (e) {
    console.log(e);
  }
})();
