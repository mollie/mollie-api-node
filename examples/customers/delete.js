/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/delete-customer
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer = await mollieClient.customers.delete('cst_6ruhPN4V5Q');

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
