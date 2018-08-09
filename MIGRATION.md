# Migrating from v1.x to v2.0

Version 2.x of the Node client uses the v2 Mollie API. Please refer to  [Migrating from v1 to v2](https://docs.mollie.com/migrating-v1-to-v2) for a general overview of the changes introduced by the new Mollie API.

Code examples can be found in the [`/examples`](https://github.com/mollie/mollie-api-node/tree/master/examples) folder.

## Package renamed
We've renamed our NPM package to `@mollie/api-client`. To install:

```sh
npm install @mollie/api-client --save
```

Or using [yarn](https://yarnpkg.com/):
    
```sh
yarn add @mollie/api-client
```


## Initialisation change

Changed the initialisation of the client to a factory method: 

```diff
-var Mollie = require('mollie-api-node');
-var mollie = new Mollie.API.Client;
-mollie.setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
+const mollie = require('@mollie/api-client')({
+  apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
+});
```

## Callback signature change

```diff
-(response) => {
-  if (response.error) {
-    throw response.error;
+(error, response) => {
+  if (error) {
+    throw error;
  }
  return response;
}
```

## Amount changes

All amounts in the API are passed as a map containing both a currency and a value property. You need to pass both when creating a new payment:


```diff
mollie.payments.create({
-  amount: 10.00
+  amount: {
+    "currency": "EUR",
+    "value": "10.00"
+  }
});

```

This example object describes an amount of €10.00.

## Combined date and time fields

Formatting of fields such as `createdAt` has been updated to be strictly compliant to ISO-8601 formatting. Example value: `2018-03-05T12:30:10+00:00`.

## Status changes

- The statuses `paidout`, `refunded` and `charged_back` have been removed.
- The status `cancelled` has been renamed to `canceled` (US English spelling). You can use helper methods on the Payment model to check for the payment status.

We introduced the following methods on a Payment model:

- `payment.isOpen()`
- `payment.isPaid()`
- `payment.isCanceled()`
- `payment.isExpired()`
- `payment.isRefundable()`

## Recurring payment changes

`recurringType` has been renamed to `sequenceType`. This field is now always present. A one-off payment (not the start of a recurring sequence and not a recurring payment) will have the value `oneoff`.

```javascript
mollie.customers_payments
  .create({
    amount: { value: '0.01', currency: 'EUR' },
    description: 'A first payment for recurring',
    redirectUrl: `https://example.org/redirect`,
    webhookUrl: `http://example.org/webhook`,
    sequenceType: 'first',
    customerId: 'cst_2mVdVmuVq2',
  });
```

## Deprecated `withParent`

We decided to deprecate `withParent` in favor of passing the parent ID in the `params`. That means we will move from:

```javascript
mollie.customers.all(function(err, customers) {
  customers.forEach(function(err, customer) {
    if (err) {
      // handle error
    }
    mollie.customers_payments.withParent(customer).all(function(err, payments) {
      if (err) {
        // handle error
      }
      console.log(payments);
    });
  });
});
```

to:

```javascript
mollieClient.customers.all()
  .then(customers => (
    customers.forEach(customer => 
      mollieClient.payments.get({
        customerId: customer.id,
      })
        .then(payments => console.log(payments))
        .catch(err => console.error(err))
    )
  ))
  .catch(err => console.error(err));
```

## Pagination

We improved support for accessing large sets of objects. We're now using cursor-based pagination instead of pagination based on counts and offsets.

```javascript
mollie.payments
  .all({
    limit: 15,
    from: 'tr_8WhJKGmgBy'
  })
  .then((payments) => {
    // Returns the list of 15 payments, starting with payment `tr_8WhJKGmgBy`
  }
```
