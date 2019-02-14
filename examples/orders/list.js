/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/list-orders
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mostRecentOrders = await mollieClient.orders.all();
    const previousOrders = await mostRecentOrders.nextPage();

    console.log(mostRecentOrders);
    console.log(previousOrders);
  } catch (e) {
    console.log(e);
  }
})();
