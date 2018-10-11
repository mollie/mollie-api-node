/**
 * Example 09 - How to list all a customer's payments.
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

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
