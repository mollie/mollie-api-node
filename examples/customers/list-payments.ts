/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
 */
import createMollieClient, { List, Payment } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payments: List<Payment> = await mollieClient.customerPayments.page({ customerId: 'cst_pzhEvnttJ2' });

    console.log(payments);
  } catch (error) {
    console.warn(error);
  }
})();
