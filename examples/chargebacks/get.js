/**
 * @docs https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const chargeback = await mollieClient.payments_chargebacks.get('chb_n9z0tp', {
      paymentId: 'tr_23j4231',
    });

    console.log(chargeback);
  } catch (error) {
    console.warn(error);
  }
})();
