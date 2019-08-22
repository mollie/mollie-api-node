![Mollie](https://www.mollie.com/files/Mollie-Logo-Style-Small.png)

### Changelog

All notable changes to this project will be documented in this file.

#### v3.0.0 - no release yet
  - Added TypeScript type definitions
  - Added Orders API
  - Added ES module in addition to the CommonJS module
  - Added QR code support
  - Added pagination support
  - Added support for embedded resources (`payments`, `refunds`, `chargebacks`, etc.)

### v2.3.3 - 2019-07-14
  - Update dependencies

### v2.3.2 - 2019-06-06
  - Update dependencies.

#### v2.3.1 - 2019-05-30
  - Update dependencies.

#### v2.3.0 - 2019-05-01
  - Removed the Bitcoin payment method.

#### v2.2.0 - 2019-31-03
  - Upgraded various dependencies (#106)
  - Dropped support for Node 4.x. We decided not to release a new major version, as Node 4.8 has reached EOL on April 30th, 2018.

#### v2.1.1 - 2018-12-04
  - Updated cacert.pem (#99)

#### v2.0.1 - 2018-08-17
  - Fixes #69.

#### v2.0.0 - 2018-08-09
  - Migrated to the v2 API. Refer to the [migration guide](/docs/migration_v3_x.md) for a complete list of changes

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
