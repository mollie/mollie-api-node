/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/cancel-order
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const canceledOrder = await mollieClient.orders.cancel('ord_8wmqcHMN4U');

    console.log(canceledOrder);
  } catch (error) {
    console.warn(error);
  }
})();
