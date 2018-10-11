/**
 * Example 16 - How to prepare a subscription with the Mollie API.
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

mollieClient.customers.all().then(customers => {
  mollieClient.customers_subscriptions
    .create({
      customerId: customers[0].id,
      amount: { value: '24.00', currency: 'EUR' },
      times: 4,
      interval: '3 months',
      description: 'Quarterly payment',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
    })
    .then(({ id }) => {
      // i.e. send confirmation email
    })
    .catch(error => {
      // Do some proper error handling
    });
});
