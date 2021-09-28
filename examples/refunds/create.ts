/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/create-refund
 * @docs https://docs.mollie.com/reference/v2/orders-api/create-order-refund
 */
import createMollieClient, { Refund } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    // Create payment refund
    const paymentRefund: Refund = await mollieClient.paymentRefunds.create({
      paymentId: 'tr_WDqYK6vllg',
      amount: {
        value: '5.95',
        currency: 'EUR',
      },
    });

    console.log(paymentRefund);

    // Create order refund
    const orderRefund: Refund = await mollieClient.orderRefunds.create({
      orderId: 'ord_stTC2WHAuS',
      lines: [
        {
          id: 'odl_dgtxyl',
          quantity: 1,
        },
      ],
      description: 'Required quantity not in stock, refunding one photo book.',
    });

    console.log(orderRefund);
  } catch (error) {
    console.warn(error);
  }
})();
