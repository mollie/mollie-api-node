/**
 * Example 10 - How to create a first payment to allow for recurring payments later.
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

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
