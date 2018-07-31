/**
 * Example 05 - How to retrieve your payments history.
 */

const express = require('express');
const mollie = require('@mollie/api-client');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

app.get('/', (req, res) => {
  let paymentParameters = {
    limit: 5,
  };

  if (req.query.from) {
    paymentParameters = {
      ...paymentParameters,
      from: req.query.from,
    };
  }

  mollieClient.payments
    .all(paymentParameters)
    .then(payments => {
      res.send(`
        <ul>
          ${payments
            .map(
              payment => `<li>
                  Payment ID: ${payment.id}<br />
                  Method: ${payment.method}<br />
                  Amount: ${payment.amount.value} ${payment.amount.currency}<br />
                  Created at: ${new Date(payment.createdAt)}
                </li>`,
            )
            .join('')}

            <br /><br />

            ${
              payments.previousPageCursor
                ? `<a href="?from=${payments.previousPageCursor}">Previous</a> | `
                : ''
            }
            ${payments.nextPageCursor ? `<a href="?from=${payments.nextPageCursor}">Next</a>` : ''}
        </ul>
      `);
    })
    .catch(error => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
