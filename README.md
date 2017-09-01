> **Note:**
>
> This is the README of the v2 Node client. If you are looking for the README of v1 you should look [here](https://github.com/mollie/mollie-api-node/blob/b5873dffdfc84fd8a9347cfda623fea78497405b/README.md).

![Mollie](https://www.mollie.nl/files/Mollie-Logo-Style-Small.png)

Node client for Mollie's API.  

# About

[Mollie](https://www.mollie.com/) builds payment products, commerce solutions and APIs that let you accept online and mobile payments, for small online stores and Fortune 500s alike. Accepting [iDEAL](https://www.mollie.com/payments/ideal/), [Bancontact/Mister Cash](https://www.mollie.com/payments/bancontact), [SOFORT Banking](https://www.mollie.com/payments/sofort/), [Creditcard](https://www.mollie.com/payments/credit-card/), [SEPA Bank transfer](https://www.mollie.com/payments/bank-transfer), [SEPA Direct debit](https://www.mollie.com/payments/direct-debit/), [Bitcoin](https://www.mollie.com/payments/bitcoin/), [PayPal](https://www.mollie.com/payments/paypal/), [Belfius Direct Net](https://www.mollie.com/payments/belfius/) and [paysafecard](https://www.mollie.com/payments/paysafecard/) online payments without fixed monthly costs or any punishing registration procedures. Just use the Mollie API to receive payments directly on your website or easily refund transactions to your customers.

## Features

- [Payments](https://www.mollie.com/en/docs/reference/payments/create): are the heart of the Mollie API: this is where most implementations start off. 
- [Methods](https://www.mollie.com/en/docs/reference/methods/list): show all the payment methods activated on the website profile.
- [Issuers](https://www.mollie.com/en/docs/reference/issuers/list): allow you to integrate iDEAL's bank selection screen into your own payment flow.
- [Refunds](https://www.mollie.com/en/docs/reference/refunds/list-all): allow you to make refunds in relation to a payment.
- [Customers](https://www.mollie.com/en/docs/reference/customers/create): allow you to manage your customer's details.
- [Mandates](https://www.mollie.com/en/docs/reference/mandates/create): allow you to charge a customer's credit card or bank account recurrently.
- [Subscriptions](https://www.mollie.com/en/docs/reference/subscriptions/create): allow you to schedule recurring payments to take place at regular intervals.

# Getting started

- [Requirements](#requirements)
- [Installation](#installation)
- [Importing the client](#importing-the-client)
- [Authentication](#authentication)
- [Making your first request](#making-your-first-request)
- [Documentation](#documentation)

## Requirements

To use the Mollie API client, the following things are required:

+ Get yourself a free [Mollie account](https://www.mollie.com/dashboard/signup). No sign up costs.
+ Login to your [Dashboard](https://www.mollie.com/dashboard) to get your API keys (live and test mode).
+ Now you're ready to use the Mollie API client in test mode.
+ In order to accept payments in live mode, payment methods must be activated in your account. Just follow [a few steps](https://www.mollie.com/dashboard/?modal=onboarding) and let us handle the rest.

## Installation

Using [npm](https://npmjs.org/):

```sh
npm install mollie-api-node --save
```

Or using [yarn](https://yarnpkg.com/):
    
```sh
yarn add mollie-api-node
```

This will add `mollie-api-node` to your project's dependencies.

You may also git checkout or [download all the files](https://github.com/mollie/mollie-api-node/archive/master.zip), and include the Mollie API client manually.

Check the [releases](https://github.com/mollie/mollie-api-node/releases) page to know which versions are available.

## How to receive payments

To successfully receive a payment, these steps should be implemented:

1. Use the client to create a payment with the requested `amount`, `description`, `redirectUrl` and `webhookUrl` and optionally, a payment `method`. It is important to specify a unique `redirectUrl` where the customer is supposed to return to after the payment is completed.

2. After the payment is completed, our platform will send a request to the provided `webhookUrl` to allow the payment details to be retrieved, so you know exactly when to start processing the customer's order.

3. The customer returns, and should be satisfied to see that the order was paid and is now being processed.

## Authentication

To be able to receive data from the API, an app should authenticate with a bearer token, referred to as API keys.

We've already prepared this step by creating a `test` and `live` key for you in your [Dashboard](https://www.mollie.com/dashboard/).

## Making your first request

Import the client and set your API key

```javascript
const mollie = require('mollie-api-node')({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });
```

### Create a new payment

```javascript
mollie.payments.create({
  amount:      10.00,
  description: 'My first API payment',
  redirectUrl: 'https://yourwebshop.example.org/order/123456',
  webhookUrl:  'https://yourwebshop.example.org/webhook'
})
  .then((payment) => {
    // Forward the customer to the payment.getPaymentUrl()
  })
  .catch((err) => {
    // Handle the error
  });
```

### Retrieve a payment

```javascript
mollie.payments.get(payment.id)
  .then((payment) => {
    // E.g. check if the payment.isPaid()
  })
  .catch((err) => {
    // Handle the error
  });
```

That's it!

## Documentation

To help you get the most out of this client, we've prepared reference documentation, tutorials and other examples that will help you learn and understand how to use this library.

### Guides

For a deep dive in how our systems function we refer to our excellent [guides](https://www.mollie.com/en/docs/overview). These guides provide a complete overview of the Mollie API and cover specific topics dealing with a number of important aspects of the API.

### API reference

This library is a wrapper around our Mollie API. Some more specific details such as query parameters and pagination are better explained in our [API reference](https://www.mollie.com/en/docs/reference), and you can also get a better understanding of how the requests look under the hood.

## Migrating from v1.x

The API client v2.0 was a major rewrite, with some breaking changes. While the basic functionality stayed the same and the method names did not change, some function signatures have changed.
 
See the [migration guide](MIGRATION.md) for more information.

## Contributing

Want to help us make our API client even better? We take [pull requests](https://github.com/mollie/mollie-api-node/pulls).

## Working at Mollie

Mollie is always looking for new talent to join our teams. We’re looking for inquisitive minds with good ideas and strong opinions, and, most importantly, who know how to ship great products. Want to join the future of payments? [Check out our vacancies](https://mollie.homerun.co/).

## License

[New BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/BSD-3-Clause). Copyright 2013-2017, Mollie B.V.
