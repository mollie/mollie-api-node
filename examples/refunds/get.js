/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/get-refund
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const refund = await mollieClient.paymentsRefunds.get('re_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });

    console.log(refund);
  } catch (error) {
    console.warn(error);
  }
})();
