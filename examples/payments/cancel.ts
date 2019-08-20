/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/cancel-payment
 */
import createMollieClient, { Payment } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment: Payment = await mollieClient.payments.delete('tr_Eq8xzWUPA4');

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
