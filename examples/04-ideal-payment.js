/**
 * Example 04 - How to prepare an iDEAL payment with the Mollie API.
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

app.get('/', (req, res) => {
  const selectedIssuer = req.query.issuer;

  // Show a payment screen where the consumer can choose its issuing bank.
  if (!selectedIssuer) {
    mollieClient.issuers.all()
      .then((issuers) => {
        res.send(`<form>
          <select name="issuer">${issuers.map(issuer => `<option value="${issuer.id}">${issuer.name}</option>`)}</select>
          <button>Select</button>
        </form>`);
      })
      .catch((error) => {
        // Do some proper error handling.
        res.send(error);
      });

    return;
  }

  const orderId = new Date().getTime();

  // After which you can create an iDEAL payment with the selected issuer.
  mollieClient.payments.create({
    amount: 10.00,
    description: 'Integration test payment',
    redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
    webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
    metadata: { orderId },
    method: 'ideal',
    issuer: selectedIssuer,
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
