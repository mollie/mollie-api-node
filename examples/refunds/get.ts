/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/get-refund
 */
import createMollieClient, { Refund } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const refund: Refund = await mollieClient.payments_refunds.get('re_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });
    console.log(refund);
  } catch (e) {
    console.log(e);
  }
})();