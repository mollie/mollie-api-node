/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/list-customers
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customers = await mollieClient.customers.all();

    console.log(customers);
  } catch (error) {
    console.warn(error);
  }
})();
