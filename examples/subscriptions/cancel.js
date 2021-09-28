/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const subscription = await mollieClient.customerSubscriptions.delete('sub_PCN3U3U27K', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(subscription);
  } catch (error) {
    console.warn(error);
  }
})();
