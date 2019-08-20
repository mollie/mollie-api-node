/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/get-order
 */
import createMollieClient, { Order } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const order: Order = await mollieClient.orders.get('ord_stTC2WHAuS');

    console.log(order);
  } catch (error) {
    console.warn(error);
  }
})();
