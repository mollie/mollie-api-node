/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/get-method
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const methods = await mollieClient.methods.get('ideal');

    console.log(methods);
  } catch (e) {
    console.log(e);
  }
})();
