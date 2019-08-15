/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
import createMollieClient, { Customer } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customer: Customer = await mollieClient.customers.get('cst_pzhEvnttJ2');

    console.log(customer);
  } catch (e) {
    console.log(e);
  }
})();
