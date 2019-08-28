/**
 * Example 07 - How to create a new customer.
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

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
