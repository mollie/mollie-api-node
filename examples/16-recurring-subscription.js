/**
 * Example 16 - How to prepare a subscription with the Mollie API.
 */

const mollie = require('mollie-api-node');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

mollieClient.customers.all().then((customers) => {
  mollie.customers_subscriptions
    .create({
      customerId: customers[0].id,
      amount: 24.00,
      times: 4,
      interval: '3 months',
      description: 'Quarterly payment',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
    })
    .then(({ id }) => {
      // i.e. send confirmation email
      notifyCustomer(id);
    })
    .catch((error) => {
      console.error(error);
    });
});
