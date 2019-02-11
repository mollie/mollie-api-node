/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer = await mollieClient.customers.get('cst_pzhEvnttJ2');

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
