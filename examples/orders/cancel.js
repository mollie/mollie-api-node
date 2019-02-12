/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/cancel-order
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const canceledOrder = await mollieClient.orders.cancel('ord_8wmqcHMN4U');

    console.log(canceledOrder);
  } catch (e) {
    console.log(e);
  }
})();
