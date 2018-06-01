![Mollie](https://www.mollie.com/files/Mollie-Logo-Style-Small.png)

### Changelog

All notable changes to this project will be documented in this file.

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
