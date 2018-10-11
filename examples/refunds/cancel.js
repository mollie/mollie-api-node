/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const refund = await mollieClient.payments_refunds.delete('re_Fr4A9B55NN', {
      paymentId: 'tr_x5Sj9HU83J',
    });

    console.log(refund);
  } catch (e) {
    console.log(e);
  }
})();
