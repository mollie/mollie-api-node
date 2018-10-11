/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const payments = await mollieClient.customers_payments.all({ customerId: 'cst_pzhEvnttJ2' });

    console.log(payments);
  } catch (e) {
    console.log(e);
  }
})();
