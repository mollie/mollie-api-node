/**
 * Example 03 - How to show a return page to the customer.
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

// Fetch the order from your database.
const getOrder = orderId => ({
  orderId,
  paymentId: 'tr_7r4n54c710n',
});

app.get('/return-page', (req, res) => {
  // If you included an order ID in the redirectUrl you can use it to get the payment ID.
  const order = getOrder(req.query.orderId);

  mollieClient.payments
    .get(order.paymentId)
    .then((payment) => {
      // Show the consumer the status of the payment using `payment.status`.
      res.send(payment.status);
    })
    .catch((error) => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
