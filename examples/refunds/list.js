/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/list-refunds
 * @docs https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    // Payment refunds
    const paymentRefunds = await mollieClient.payments_refunds.page({ paymentId: 'tr_WDqYK6vllg' });
    console.log(paymentRefunds);

    // Order refunds
    const orderRefunds = await mollieClient.orders_refunds.all({ orderId: 'ord_stTC2WHAuS' });
    console.log(orderRefunds);
  } catch (e) {
    console.log(e);
  }
})();
