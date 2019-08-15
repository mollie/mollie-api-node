/**
 * Example 02 - How to verify Mollie API payments with a webhook.
 *
 * @see https://www.mollie.com/en/docs/webhook
 */

const express = require('express');
const { createMollieClient } = require('@mollie/api-client');

const app = express();
const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

/**
 * Your webhook will be called with a single POST-parameter named id, which for example will
 * contain the value tr_7r4n54c710n. You should use that id to actively fetch the payment to
 * find out about its status.
 */
app.post('/webhook', (req, res) => {
  mollieClient.payments
    .get(req.body.id)
    .then(payment => {
      if (payment.isPaid()) {
        // Hooray, you've received a payment! You can start shipping to the consumer.
      } else if (!payment.isOpen()) {
        // The payment isn't paid and has expired. We can assume it was aborted.
      }
      res.send(payment.status);
    })
    .catch(error => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
