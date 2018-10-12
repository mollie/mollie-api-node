/**
 * Example 07 - How to create a new customer.
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

mollieClient.customers
  .create({
    name: 'Luke Skywalker',
    email: 'luke@example.org',
    metadata: {
      isJedi: true,
    },
  })
  .then(customer => {
    // New customer created with ID `customer.id` and name `customer.name`.
  })
  .catch(error => {
    // Do some proper error handling.
  });
