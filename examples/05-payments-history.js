/**
 * Example 05 - How to retrieve your payments history.
 */

const express = require('express');
const mollie = require('mollie-api-node');

const app = express();
const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

const PAGE_SIZE = 50;

app.get('/', (req, res) => {
  const pageNumber = Math.abs(req.query.page) || 1;
  const offset = pageNumber - 1;

  mollieClient.payments.all({
    count: PAGE_SIZE,
    offset: PAGE_SIZE * offset,
  })
    .then((payments) => {
      // List your payments.
      const pageCount = Math.ceil(payments.totalCount / PAGE_SIZE);

      res.send(`
        <ul>
          ${payments.map(payment => `<li>${payment.method}, ${payment.amount}, ${payment.status}, ${new Date(payment.createdDatetime)}</li>`).join('')}
        </ul>
        <ul>
            ${Array.from(new Array(pageCount).keys()).map((item, index) => `<li><a href="?page=${index + 1}">${index + 1}</a></li>`).join('')}
        </ul>
      `);
    })
    .catch((error) => {
      // Do some proper error handling.
      res.send(error);
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000.'));
