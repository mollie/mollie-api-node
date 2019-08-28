/**
 * Example 09 - How to list all a customer's payments.
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

mollieClient.customers_payments
  .all({
    count: 50,
    customerId: 'cst_cu5t0m3r',
  })
  .then(payments => {
    // List the customer's payments.
  })
  .catch(error => {
    // Do some proper error handling.
  });
