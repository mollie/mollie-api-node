/**
 * Example 10 - How to create a first payment to allow for recurring payments later.
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

const orderId = new Date().getTime();

mollieClient.customers_payments
  .create({
    amount: { value: '0.01', currency: 'EUR' },
    description: 'A first payment for recurring',
    redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
    webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
    sequenceType: 'first',
    customerId: 'cst_2mVdVmuVq2',
  })
  .then(payment => {
    // Redirect the customer to complete the payment using `payment.getPaymentUrl()`.
  })
  .catch(error => {
    // Do some proper error handling.
  });
