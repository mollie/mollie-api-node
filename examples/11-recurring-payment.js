/**
 * Example 11 - How to create an on-demand recurring payment.
 */

const mollie = require('mollie-api-node');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

mollieClient.customers.all()
  .then((customers) => {
    const customerId = customers[0].id; // Select one of your customers.
    const orderId = new Date().getTime();

    mollieClient.customers_payments.create({
      amount: 10.00,
      description: `Recurring payment for customer ${customerId}`,
      redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
      webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
      metadata: { orderId },
      customerId,
      recurringType: 'recurring',
    })
      .then((payment) => {
        // Redirect customer to payment screen with `payment.getPaymentUrl()`.
      })
      .catch((error) => {
        // Do some proper error handling.
      });
  })
  .catch((error) => {
    // Do some proper error handling.
  });