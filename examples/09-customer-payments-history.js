/**
 * Example 09 - How to list all a customer's payments.
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

const PAGE_SIZE = 50;

const expressMiddlewareExample = (req, res) => {
  const pageNumber = req.query.page || 0;

  mollieClient.customers_payments.all({
    count: PAGE_SIZE,
    offset: PAGE_SIZE * pageNumber,
    customerId: 'cst_cu5t0m3r',
  })
    .then((payments) => {
      // List the customer's payments.
    })
    .catch((error) => {
      // Do some proper error handling.
    });
};
