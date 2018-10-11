/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/get-method
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const method = await mollieClient.methods.get('ideal', {
      include: 'issuers',
    });

    console.log(method);
  } catch (e) {
    console.log(e);
  }
})();
