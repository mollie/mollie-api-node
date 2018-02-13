/**
 * Example 10 - How to create a first payment to allow for recurring payments later.
 */

const mollie = require('mollie-api-node');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

const orderId = new Date().getTime();

mollieClient.customers_payments.create({
  amount: 0.01,
  description: 'A first payment for recurring',
  redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
  webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
  recurringType: 'first',
})
  .then((payment) => {
    // Redirect the customer to complete the payment using `payment.getPaymentUrl()`.
  })
  .catch((error) => {
    // Do some proper error handling.
  });
