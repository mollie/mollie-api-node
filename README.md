![Mollie](https://www.mollie.nl/files/Mollie-Logo-Style-Small.png)

# Mollie API client for Node #

Accepting [iDEAL](https://www.mollie.com/ideal/), [Bancontact/Mister Cash](https://www.mollie.com/mistercash/), [SOFORT Banking](https://www.mollie.com/sofort/), [Creditcard](https://www.mollie.com/creditcard/), [SEPA Bank transfer](https://www.mollie.com/overboeking/), [SEPA Direct debit](https://www.mollie.com/directdebit/), [Bitcoin](https://www.mollie.com/bitcoin/), [PayPal](https://www.mollie.com/paypal/), [Belfius Direct Net](https://www.mollie.com/belfiusdirectnet/) and [paysafecard](https://www.mollie.com/paysafecard/) online payments without fixed monthly costs or any punishing registration procedures. Just use the Mollie API to receive payments directly on your website or easily refund transactions to your customers.

## Requirements ##
To use the Mollie API client, the following things are required:

+ Get yourself a free [Mollie account](https://www.mollie.nl/aanmelden). No sign up costs.
+ Create a new [Website profile](https://www.mollie.nl/beheer/account/profielen/) to generate API keys (live and test mode) and setup your webhook.
+ Now you're ready to use the Mollie API client in test mode.
+ In order to accept payments in live mode, payment methods must be activated in your account. Follow [a few of steps](https://www.mollie.nl/beheer/diensten), and let us handle the rest.

## Installation ##

By far the easiest way to install the Mollie API client is to install it with [npm](https://npmjs.org/).

    $ npm install mollie-api-node --save

    {
        "dependencies": {
            "mollie-api-node": "^1.3.5"
        }
    }

You may also git checkout or [download all the files](https://github.com/mollie/mollie-api-node/archive/master.zip), and include the Mollie API client manually.

## How to receive payments ##

To successfully receive a payment, these steps should be implemented:

1. Use the Mollie API client to create a payment with the requested amount, description and optionally, a payment method. It is important to specify a unique redirect URL where the customer is supposed to return to after the payment is completed.

2. Immediately after the payment is completed, our platform will send an asynchronous request to the configured webhook to allow the payment details to be retrieved, so you know when exactly to start processing the customer's order.

3. The customer returns, and should be satisfied to see that the order was paid and is now being processed.

## Getting started ##

Requiring the library.

```javascript
Mollie = require("mollie-api-node");
```

Initializing the Mollie API client, and setting your API key.

```javascript
mollie = new Mollie.API.Client;
mollie.setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
```

Creating a new payment.

```javascript
mollie.payments.create({
    amount:      10.00,
    description: "My first API payment",
    redirectUrl: "https://webshop.example.org/order/12345/",
    webhookUrl:  "https://webshop.example.org/mollie-webhook/"
}, function (payment) {
    response.writeHead(302, { Location: payment.getPaymentUrl() })
});
```

Retrieving a payment.

```javascript
mollie.payments.get(
    payment.id
, function (payment) {
    if (payment.isPaid()) {
        console.log("Payment received.");
    }
});
```

## Want to help us make our API client even better? ##

Want to help us make our API client even better? We take [pull requests](https://github.com/mollie/mollie-api-node/pulls?utf8=%E2%9C%93&q=is%3Apr), sure. But how would you like to contribute to a [technology oriented organization](https://www.mollie.com/nl/blog/post/werken-bij-mollie-sfeer-kansen-en-mogelijkheden/)? Mollie is hiring developers and system engineers. [Check out our vacancies](https://www.mollie.com/nl/jobs) or [get in touch](mailto:personeel@mollie.com).

## License ##
[BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/bsd-license.php).
Copyright (c) 2013-2017, Mollie B.V.

## Support ##
Contact: [www.mollie.com](https://www.mollie.com) — info@mollie.com — +31 20-612 88 55

+ [More information about iDEAL via Mollie](https://www.mollie.com/ideal/)
+ [More information about credit card via Mollie](https://www.mollie.com/creditcard/)
+ [More information about Bancontact/Mister Cash via Mollie](https://www.mollie.com/mistercash/)
+ [More information about SOFORT Banking via Mollie](https://www.mollie.com/sofort/)
+ [More information about SEPA Bank transfer via Mollie](https://www.mollie.com/banktransfer/)
+ [More information about SEPA Direct debit via Mollie](https://www.mollie.com/directdebit/)
+ [More information about Bitcoin via Mollie](https://www.mollie.com/bitcoin/)
+ [More information about PayPal via Mollie](https://www.mollie.com/paypal/)
+ [More information about Belfius Direct Net via Mollie](https://www.mollie.com/belfiusdirectnet/)
+ [More information about paysafecard via Mollie](https://www.mollie.com/paysafecard/)
