/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/get-order
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const order = await mollieClient.orders.get('ord_stTC2WHAuS');

    console.log(order);
  } catch (e) {
    console.log(e);
  }
})();
