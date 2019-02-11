/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/get-method
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const method = await mollieClient.methods.get('ideal');

    console.log(method);
  } catch (e) {
    console.log(e);
  }
})();
