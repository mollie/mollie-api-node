/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/list-refunds
 * @docs https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    // Payment refunds
    const paymentRefunds = await mollieClient.paymentRefunds.all({ paymentId: 'tr_WDqYK6vllg' });

    console.log(paymentRefunds);

    // Order refunds
    const orderRefunds = await mollieClient.orderRefunds.all({ orderId: 'ord_stTC2WHAuS' });

    console.log(orderRefunds);
  } catch (error) {
    console.warn(error);
  }
})();
