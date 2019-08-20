/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer = await mollieClient.customers.create({
      name: 'John Doe',
      email: 'john.doe@example.org',
    });

    console.log(customer);
  } catch (error) {
    console.warn(error);
  }
})();
