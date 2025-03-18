/**
 * @docs https://docs.mollie.com/reference/release-authorization
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment = await mollieClient.payments.releaseAuthorization('tr_Eq8xzWUPA4');

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
