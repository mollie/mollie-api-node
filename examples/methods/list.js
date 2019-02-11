/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const methods = await mollieClient.methods.all();

    console.log(methods);
  } catch (e) {
    console.log(e);
  }
})();
