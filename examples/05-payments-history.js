/**
 * Example 05 - How to retrieve your payments history.
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

app.get('/', (req, res) => {
  mollieClient.payments
    .all()
    .then((payments) => {
      res.send(`
        <ul>
          ${payments
            .map(
              payment =>
                `<li>${payment.method}, ${payment.amount.value} ${payment.amount.currency}, ${payment.status}, ${new Date(payment.createdAt)}</li>`,
            )
            .join('')}
        </ul>
      `);
    })
    .catch((error) => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
