/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/list-orders
 */
import createMollieClient, { List, Order } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mostRecentOrders: List<Order> = await mollieClient.orders.all();
    const previousOrders: List<Order> = await mostRecentOrders.nextPage();

    console.log(mostRecentOrders);
    console.log(previousOrders);
  } catch (e) {
    console.log(e);
  }
})();
