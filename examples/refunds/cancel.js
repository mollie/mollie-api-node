/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const status = await mollieClient.payments_refunds.cancel('re_4qqhO89gsT', { paymentId: 'tr_WDqYK6vllg' });
    console.log(status);
  } catch (e) {
    console.log(e);
  }
})();
