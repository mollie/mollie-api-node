/**
 * @docs https://docs.mollie.com/reference/v2/orders-api/create-order-payment
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment = await mollieClient.orderPayments.create({
      orderId: 'ord_kEn1PlbGa',
      method: PaymentMethod.ideal,
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
