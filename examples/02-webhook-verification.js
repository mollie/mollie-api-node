/**
 * Example 02 - How to verify Mollie API payments with a webhook.
 *
 * @see https://www.mollie.com/en/docs/webhook
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

/**
 * Your webhook will be called with a single POST-parameter named id, which for example will
 * contain the value tr_7r4n54c710n. You should use that id to actively fetch the payment to
 * find out about its status.
 */
app.get('/webhook', (req, res) => {
  mollieClient.payments
    .get(req.body.id)
    .then(payment => {
      if (payment.isPaid()) {
        // Hooray, you've received a payment! You can start shipping to the consumer.
      } else if (!payment.isOpen()) {
        // The payment isn't paid and has expired. We can assume it was aborted.
      }
    })
    .catch(error => {
      // Do some proper error handling.
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
