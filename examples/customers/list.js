/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/list-customers
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const customers = await mollieClient.customers.all();

    console.log(customers);
  } catch (e) {
    console.log(e);
  }
})();
