/**
 * Example 01 - How to prepare a new payment with the Mollie API.
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

app.get('/', (req, res) => {
  const orderId = new Date().getTime();

  mollieClient.payments
    .create({
      amount: { value: '10.00', currency: 'USD' },
      description: 'New payment',
      redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
      webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
      metadata: { orderId },
    })
    .then((payment) => {
      // Redirect the consumer to complete the payment using `payment.getPaymentUrl()`.
      res.redirect(payment.getPaymentUrl());
    })
    .catch((error) => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
