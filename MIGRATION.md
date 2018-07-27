# Migrating from v1.x to v2.0

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
