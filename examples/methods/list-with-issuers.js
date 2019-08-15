/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const methods = await mollieClient.methods.all({
      include: 'issuers',
    });

    console.log(methods);
  } catch (e) {
    console.log(e);
  }
})();
