/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const subscription = await mollieClient.customers_subscriptions.get('sub_PCN3U3U27K', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(subscription);
  } catch (e) {
    console.log(e);
  }
})();
