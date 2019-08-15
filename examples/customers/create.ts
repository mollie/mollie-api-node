/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer
 */
import createMollieClient, { Customer } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer: Customer = await mollieClient.customers.create({
      name: 'John Doe',
      email: 'john.doe@example.org',
    });

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
