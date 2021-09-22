/**
 * Example 16 - How to prepare a subscription with the Mollie API.
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

mollieClient.customers.all().then(customers => {
  mollieClient.customersSubscriptions
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
