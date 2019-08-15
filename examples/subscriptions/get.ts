/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
 */
import createMollieClient, { Subscription } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const subscription: Subscription = await mollieClient.customers_subscriptions.get('sub_PCN3U3U27K', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(subscription);
  } catch (e) {
    console.log(e);
  }
})();
