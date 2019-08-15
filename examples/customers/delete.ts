/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/delete-customer
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const result = await mollieClient.customers.delete('cst_6ruhPN4V5Q');

    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();
