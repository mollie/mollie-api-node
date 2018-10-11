/**
 * @docs https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    // @todo: Implement in client
    const chargeback = await mollieClient.chargebacks.get('chb_m06b43', {
      paymentId: 'tr_fyS4Pa5aNP',
    });

    console.log(chargeback);
  } catch (e) {
    console.log(e);
  }
})();
