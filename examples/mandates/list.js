/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/list-mandates
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const mandates = await mollieClient.customers_mandates.all({
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(mandates);
  } catch (e) {
    console.log(e);
  }
})();
