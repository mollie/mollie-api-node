/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/update-customer
 */
import createMollieClient, { Customer } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer: Customer = await mollieClient.customers.update('cst_pzhEvnttJ2', {
      name: 'Updated customer name',
      email: 'updated-email@example.org',
    });

    console.log(customer);
  } catch (error) {
    console.warn(error);
  }
})();
