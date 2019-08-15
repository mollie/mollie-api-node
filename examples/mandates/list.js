/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/list-mandates
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mandates = await mollieClient.customers_mandates.all({
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(mandates);
  } catch (e) {
    console.log(e);
  }
})();
