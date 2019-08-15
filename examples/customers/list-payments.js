/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payments = await mollieClient.customers_payments.all({ customerId: 'cst_pzhEvnttJ2' });

    console.log(payments);
  } catch (e) {
    console.log(e);
  }
})();
