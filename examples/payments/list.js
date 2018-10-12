/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/list-payments
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const payments = await mollieClient.payments.all();

    console.log(payments);
  } catch (e) {
    console.log(e);
  }
})();
