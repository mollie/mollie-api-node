/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/cancel-order
 */
import createMollieClient, { Order } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const canceledOrder: Order = await mollieClient.orders.cancel('ord_8wmqcHMN4U');

    console.log(canceledOrder);
  } catch (error) {
    console.warn(error);
  }
})();
