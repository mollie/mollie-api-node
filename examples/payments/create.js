/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/create-payment
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00', // You must send the correct number of decimals, thus we enforce the use of strings
      },
      description: 'My first payment',
      redirectUrl: 'https://webshop.example.org/order/12345/',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
      metadata: {
        order_id: '12345',
      },
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
