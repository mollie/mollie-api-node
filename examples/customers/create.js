/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const customer = await mollieClient.customers.create({
      name: 'John Doe',
      email: 'john.doe@example.org',
    });

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
