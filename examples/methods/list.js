/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const methods = await mollieClient.methods.all();

    console.log(methods);
  } catch (error) {
    console.warn(error);
  }
})();
