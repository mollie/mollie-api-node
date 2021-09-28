/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const status: boolean = await mollieClient.paymentRefunds.cancel('re_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });

    console.log(status);
  } catch (error) {
    console.warn(error);
  }
})();
