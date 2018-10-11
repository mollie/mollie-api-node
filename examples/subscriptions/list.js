/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const subscriptions = await mollieClient.customers_subscriptions.all({
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(subscriptions);
  } catch (e) {
    console.log(e);
  }
})();
