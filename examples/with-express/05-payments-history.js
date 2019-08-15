/**
 * Example 05 - How to retrieve your payments history.
 */

const express = require('express');
const { createMollieClient } = require('@mollie/api-client');

const app = express();
const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

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
        </ul>
        ${payments.previousPageCursor ? `<a href="?from=${payments.previousPageCursor}">Previous</a> | ` : ''}
        ${payments.nextPageCursor ? `<a href="?from=${payments.nextPageCursor}">Next</a>` : ''}
      `);
    })
    .catch(error => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
