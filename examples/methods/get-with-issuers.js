/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/get-method
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const method = await mollieClient.methods.get('ideal', {
      include: 'issuers',
    });

    console.log(method);
  } catch (e) {
    console.log(e);
  }
})();
