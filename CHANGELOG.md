![Mollie](https://www.mollie.com/files/Mollie-Logo-Style-Small.png)

### Changelog

All notable changes to this project will be documented in this file.

### v3.6.0 _Christmas special_ - 2021-12-25

  - Update APIs ([#211](https://github.com/mollie/mollie-api-node/pull/211)/[#229](https://github.com/mollie/mollie-api-node/pull/229)/[#245](https://github.com/mollie/mollie-api-node/pull/245))
  - Update documentation ([#244](https://github.com/mollie/mollie-api-node/pull/244))
  - Implement iteration API ([#235](https://github.com/mollie/mollie-api-node/pull/235))
  - Rename properties to dromedary case, e.g. `customers_payments` → `customerPayments` ([#223](https://github.com/mollie/mollie-api-node/pull/223)/[#226](https://github.com/mollie/mollie-api-node/pull/226))
  - Add link methods, e.g. `payment.getRefunds()` ([#232](https://github.com/mollie/mollie-api-node/pull/232))
  - Add `refresh` method ([#225](https://github.com/mollie/mollie-api-node/pull/225))
  - Deprecate unhelpful methods and properties ([#233](https://github.com/mollie/mollie-api-node/pull/233)/[#234](https://github.com/mollie/mollie-api-node/pull/234)/[#240](https://github.com/mollie/mollie-api-node/pull/240)/[#241](https://github.com/mollie/mollie-api-node/pull/241)/[#247](https://github.com/mollie/mollie-api-node/pull/247))
  - Fix Node.js < 10 bug ([#239](https://github.com/mollie/mollie-api-node/pull/239))
  - Improve string representations ([#238](https://github.com/mollie/mollie-api-node/pull/238))
  - Improve error messages ([#236](https://github.com/mollie/mollie-api-node/pull/236))
  - Make `message` of `ApiError` instances enumerable ([#213](https://github.com/mollie/mollie-api-node/pull/213))
  - Remove lodash ([#237](https://github.com/mollie/mollie-api-node/pull/237))
  - Update dependencies and CAs ([#248](https://github.com/mollie/mollie-api-node/pull/248))

### v3.5.1 - 2021-05-14

  - Update dependencies

### v3.5.0 - 2021-03-16

  - Add Apple Pay API ([#193](https://github.com/mollie/mollie-api-node/pull/193))
  - Add documentation to methods and properties ([#195](https://github.com/mollie/mollie-api-node/pull/195))
  - Replace deprecated Node.js URL API ([#196](https://github.com/mollie/mollie-api-node/pull/196))

### v3.4.0 - 2020-10-28
  - Add `embed`, `profileId`, and `testMode` to mollieClient.orders.create ([#176](https://github.com/mollie/mollie-api-node/pull/176)/[#177](https://github.com/mollie/mollie-api-node/pull/177))
  - Fix bug in mollieClient.methods.all ([#170](https://github.com/mollie/mollie-api-node/pull/170))
  - Fix bug in mollieClient.payments.create ([#172](https://github.com/mollie/mollie-api-node/pull/172))
  - Fix types for mollieClient.orders.update ([#173](https://github.com/mollie/mollie-api-node/pull/173))
  - Add `apiEndpoint` option ([#167](https://github.com/mollie/mollie-api-node/pull/167))

### v3.3.0 - 2020-09-30
  - Add subscriptions_payments api ([#166](https://github.com/mollie/mollie-api-node/pull/166))

### v3.2.4 - 2020-08-18
  - Inlined CAs ([#162](https://github.com/mollie/mollie-api-node/pull/162))
  - Use Node.js' `querystring` modules instead of the external `qs` ([#163](https://github.com/mollie/mollie-api-node/pull/163))

### V3.2.3 - 2020-07-23
  - Bump `lodash` from 4.17.15 to 4.17.19 ([#160](https://github.com/mollie/mollie-api-node/pull/160))

### v3.2.2 - 2020-07-09
  - Fix types for mollieClient.orders.create ([#159](https://github.com/mollie/mollie-api-node/pull/159))

### v3.2.1 - 2020-07-07
  - Upgraded `kinda-of` dependency ([#158](https://github.com/mollie/mollie-api-node/pull/158))

#### v3.2.0 - 2020-06-03
  - Added the following APIs:
    - Permissions APIs
    - Organizations APIs
    - Profiles APIs
    - Onboarding APIs
  - Implemented the update Payment endpoint
  - Changed the internal architecture of the library. We're now using interfaced data, which:
    - Makes the library easier to maintain
    - Exports better type definitions
  - Fixed several bugs:
    - DELETE requests can now include data ([#147](https://github.com/mollie/mollie-api-node/issues/147))
    - Embedding multiple resources simultaneously now works ([#144](https://github.com/mollie/mollie-api-node/issues/144))
    - GET requests now include all data ([#137](https://github.com/mollie/mollie-api-node/issues/137))

#### v3.1.0 - 2020-01-28
  - Added Order Payments API

#### v3.0.0 - 2019-11-20
  - Added TypeScript type definitions
  - Added Orders, Shipments and Captures APIs
  - Added ES module in addition to the CommonJS module
  - Added QR code support
  - Added pagination support
  - Added support for embedded resources (`payments`, `refunds`, `chargebacks`, etc.)

#### v2.3.3 - 2019-07-14
  - Update dependencies

#### v2.3.2 - 2019-06-06
  - Update dependencies.

#### v2.3.1 - 2019-05-30
  - Update dependencies.

#### v2.3.0 - 2019-05-01
  - Removed the Bitcoin payment method.

#### v2.2.0 - 2019-31-03
  - Upgraded various dependencies ([#106](https://github.com/mollie/mollie-api-node/pull/106))
  - Dropped support for Node 4.x. We decided not to release a new major version, as Node 4.8 has reached EOL on April 30th, 2018.

#### v2.1.1 - 2018-12-04
  - Updated cacert.pem ([#99](https://github.com/mollie/mollie-api-node/pull/99))

#### v2.0.1 - 2018-08-17
  - Fixes [#69](https://github.com/mollie/mollie-api-node/issues/69).

#### v2.0.0 - 2018-08-09
  - Migrated to the v2 API. Refer to the [migration guide](https://docs.mollie.com/migrating-v1-to-v2) for a complete list of changes

#### v1.3.7 - 2018-06-01
  - Update bundled cacert.pem file.

#### v1.3.6 - 2017-08-02
  - Fixed `isValid()` helper method of the Mandate model.

#### v1.3.5 - 2017-02-02
  - Added missing 'subscriptionId' to Payments API.

#### v1.3.4 - 2016-12-16
  - Update bundled cacert.pem file. Follows Mozilla's recommendations on invalid certificates.

#### v1.3.3 - 2016-11-14
  - Fix an issue where the API client would crash if no data is passed to the resource.all() method.

#### v1.3.2 - 2016-10-17
  - Allow parameters 'count' and 'offset' to be passed to methods.all

#### v1.3.1 - 2016-10-12
  - Add KBC method constant

#### v1.3.0 - 2016-06-16
  - Added Subscriptions API.

#### v1.2.1 - 2016-05-27
  - Removed `X-Mollie-Client-Info` from requests.
  - Update bundled cacert.pem file. Follows Mozilla's recommendations on invalid certificates.

#### v1.2.0 - 2016-04-14
  - Added Mandates API.
  - Added `recurringType` and `mandateId` to Payments API.
  - Added recurring payments examples 14 and 15.

#### v1.1.1 - 2016-04-06
  - Update bundled cacert.pem file. Follows Mozilla's recommendations on invalid certificates.
  - Changed [README.mdown](README.mdown) installation instructions to follow semantic versioning schema.
