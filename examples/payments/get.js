/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/get-payment
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment = await mollieClient.payments.get('tr_Eq8xzWUPA4');

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
