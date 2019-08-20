/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/delete-customer
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const status = await mollieClient.customers.delete('cst_6ruhPN4V5Q');

    console.log(status);
  } catch (error) {
    console.warn(error);
  }
})();
