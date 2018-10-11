/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/update-customer
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const customer = await mollieClient.customers.update('cst_pzhEvnttJ2', {
      name: 'Updated customer name',
      email: 'updated-email@example.org',
    });

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
