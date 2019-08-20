/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/get-payment
 */
import createMollieClient, { Payment } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment: Payment = await mollieClient.payments.get('tr_Eq8xzWUPA4');

    // Check if payment is paid
    const isPaid = payment.isPaid();

    if (isPaid) {
      console.log('Payment is paid');
    } else {
      console.log(`Payment is not paid, but instead it is: ${payment.status}`);
    }
  } catch (error) {
    console.warn(error);
  }
})();
