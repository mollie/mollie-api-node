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
    mollieClient.methods
      .all({ include: 'issuers' })
      .then(methods => methods.filter(({ id }) => id === 'ideal'))
      .then(methods => {
        res.send(`<form>
        ${methods.map(
          method => `
          <h2>Select ${method.description} issuer</h2>
          <select name="issuer">${method.issuers.map(issuer => `<option value="${issuer.id}">${issuer.name}</option>`)}</select>
        `,
        )}
        <button>Select issuer</button>
        </form>`);
      })
      .catch(error => {
        // Do some proper error handling.
        res.send(error);
      });

    return;
  }

  const orderId = new Date().getTime();

  // After which you can create an iDEAL payment with the selected issuer.
  mollieClient.payments
    .create({
      amount: { value: '10.00', currency: 'EUR' },
      description: 'Test payment',
      redirectUrl: `https://example.org/redirect?orderId=${orderId}`,
      webhookUrl: `http://example.org/webhook?orderId=${orderId}`,
      metadata: { orderId },
      method: 'ideal',
      issuer: selectedIssuer,
    })
    .then(payment => {
      // Redirect the consumer to complete the payment using `payment.getPaymentUrl()`.
      res.redirect(payment.getPaymentUrl());
    })
    .catch(error => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
