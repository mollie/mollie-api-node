<p align="center">
  <img src="https://github.com/user-attachments/assets/a98b62f7-f0f1-44ac-8ade-3a83cfecf264" width="128" height="128"/>
</p>
<h1 align="center">Mollie API client for Node.js</h1>

![Mollie Node.js API Example](https://github.com/user-attachments/assets/0c1c454f-c944-4042-863c-f0a556bdb87f)

# About

[Mollie](https://www.mollie.com/) builds payment products, commerce solutions and APIs that let you accept online and mobile payments, for small online stores and Fortune 500s alike. Accepting [credit and debit card][credit-card] ([Cartes Bancaires][cartes-bancaires], [PostePay][postepay]), [Alma][alma], [Apple Pay][apple-pay], [BACS Direct Debit][bacs], [BANCOMAT Pay][bancomat-pay], [Bancontact][bancontact], [SEPA Bank Transfer][bank-transfer], [Belfius Pay Button][belfius], [Billie][billie], [BLIK][blik], [SEPA Direct Debit][direct-debit], [EPS][eps], [iDEAL][ideal] ([in3][ideal-in3]), [KBC Payment Button][kbc-cbc], [Klarna][klarna] (Pay Later, Pay Now, Pay in 3, Financing), [PayPal][paypal], [paysafecard][paysafecard], [Przelewy24][przelewy24], [Riverty][riverty], [Satispay][satispay], [Trustly][trustly], [TWINT][twint], [eco- gift- and meal vouchers][meal-eco-gift-vouchers] and [gift cards][gift-cards] online payments without fixed monthly costs or any punishing registration procedures. Just use the Mollie API to receive payments directly on your website or easily refund transactions to your customers.

### A note on use outside of Node.js

This is a JavaScript library, a language which is universal by nature. While it is theoretically possible to include this library into a website or mobile app, it is not recommended to do so.

In the typical setup, you will make calls to the Mollie API ‒ through one of our libraries ‒ from your server (e.g. a Node.js server). Your API key sits safely on this server, out of reach to the outside world.

If you include this library in a website or app, however, your API key will be shipped to users. With this key, users will be able to act on your behalf.

## Requirements

- Node.js 14.× or greater.
- A free [Mollie account](https://www.mollie.com/dashboard/signup).
- Your API keys, which you can find on your [dashboard](https://www.mollie.com/dashboard/developers/api-keys).

In order to accept payments in live mode, payment methods must be activated in your account. Just follow [a few steps](https://www.mollie.com/dashboard/onboarding) and let us handle the rest.

## Installation

Using [npm](https://npmjs.org/):

```sh
npm install @mollie/api-client
```

Using [yarn](https://yarnpkg.com/):

```sh
yarn add @mollie/api-client
```

### Manual installation

Alternatively, you may use `git clone` or [download an archive](https://github.com/mollie/mollie-api-node/archive/master.zip).

## Getting started

Build the client.

Using JavaScript modules:

```javascript
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });
```

CommonJS-style:

```javascript
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });
```

### Create a new payment

```javascript
const payment = await mollieClient.payments.create({
  amount: {
    value:    '10.00',
    currency: 'EUR'
  },
  description: 'My first API payment',
  redirectUrl: 'https://yourwebshop.example.org/order/123456',
  webhookUrl:  'https://yourwebshop.example.org/webhook'
});

// Forward the customer to payment.getCheckoutUrl().
```

When the payment is made by your customer, Mollie will send you a webhook (to the URL specified as `webhookUrl`) informing your server about the status change of the payment.

### Check the status of a payment

```javascript
const payment = await mollieClient.payments.get('tr_8WhJKGmgBy');

// Check payment.status.
```

## Pagination and iteration

Composing one long list of all payments, orders, or customers would be too much work for the Mollie API. Furthermore, such a list could be too large for your server to process. For this reason, the Mollie API only returns a subset of the requested set of objects. In other words, the Mollie API chops the result of a certain API endpoint call into pages.

If you are designing a paginated view, you can use the `page` methods to retrieve one page at a time:

```javascript
// Retrieve the first 15 payments.
const payments = mollieClient.payments.page({ limit: 15 });

// payments.nextPageCursor is the cursor: the ID of the first payment on the next page.
```

Later:

```javascript
// Retrieve the second 15 payments (using the cursor from the previous page).
const payments = mollieClient.payments.page({ limit: 15, from: 'tr_8WhJKGmgBy' });
```

The `page` methods do not fit every use case. If you find yourself retrieving multiple pages to perform a single action, consider using the `iterate` methods instead:

```javascript
// Iterate over all payments.
for await (const payment of mollieClient.payments.iterate()) {
  // (Use break to end the loop prematurely.)
}
```

The `iterate` methods perform the requests to the Mollie API for the objects you need. The following example will work regardless of whether the 10 resulting payments appear on the first page or are distributed across different pages:

```javascript
// Find the 10 most recent euro payments over €100.00.
const payments = mollieClient.payments.iterate()
  .filter(({ amount }) => amount.currency == 'EUR' && parseFloat(amount.value) > 100)
  .take(10);
```

## Guides

For a deep dive in how our systems function, we refer to [our excellent guides](https://docs.mollie.com/). These guides provide a complete overview of the Mollie API and cover specific topics dealing with a number of important aspects of the API.

## API reference

This library is a wrapper around our Mollie API. Some more specific details are better explained in [our API reference](https://docs.mollie.com/reference/), and you can also get a better understanding of how the requests look under the hood.

## Migrating

See [the migration guide](MIGRATION.md) if you are migrating from an older version of the library.

## Contributing

Want to help us make our API client even better? We take [pull requests](https://github.com/mollie/mollie-api-node/pulls), sure. But how would you like to contribute to a technology oriented organization? Mollie is hiring developers and system engineers. [Check out our vacancies](https://jobs.mollie.com/) or [get in touch](mailto:personeel@mollie.com).

## License

[New BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/BSD-3-Clause). Copyright 2013-2021, Mollie B.V.

[alma]: https://www.mollie.com/payments/alma
[apple-pay]: https://www.mollie.com/payments/apple-pay
[bacs]: https://www.mollie.com/payments/bacs
[bancomat-pay]: https://www.mollie.com/payments/bancomat-pay
[bancontact]: https://www.mollie.com/payments/bancontact
[bank-transfer]: https://www.mollie.com/payments/bank-transfer
[belfius]: https://www.mollie.com/payments/belfius
[billie]: https://www.mollie.com/payments/billie
[blik]: https://www.mollie.com/payments/blik
[cartes-bancaires]: https://www.mollie.com/payments/cartes-bancaires
[credit-card]: https://www.mollie.com/payments/credit-card
[direct-debit]: https://www.mollie.com/payments/direct-debit
[eps]: https://www.mollie.com/payments/eps
[gift-cards]: https://www.mollie.com/payments/gift-cards
[ideal]: https://www.mollie.com/payments/ideal
[ideal-in3]: https://www.mollie.com/payments/ideal-in3
[kbc-cbc]: https://www.mollie.com/payments/kbc-cbc
[klarna]: https://www.mollie.com/payments/klarna
[meal-eco-gift-vouchers]: https://www.mollie.com/payments/meal-eco-gift-vouchers
[mybank]: https://www.mollie.com/payments/mybank
[paypal]: https://www.mollie.com/payments/paypal
[paysafecard]: https://www.mollie.com/payments/paysafecard
[postepay]: https://www.mollie.com/payments/postepay
[przelewy24]: https://www.mollie.com/payments/przelewy24
[riverty]: https://www.mollie.com/payments/riverty
[satispay]: https://www.mollie.com/payments/satispay
[trustly]: https://www.mollie.com/payments/trustly
[twint]: https://www.mollie.com/payments/twint