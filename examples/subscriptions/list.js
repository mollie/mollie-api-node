/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const subscriptions = await mollieClient.customers_subscriptions.all({
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(subscriptions);
  } catch (e) {
    console.log(e);
  }
})();
