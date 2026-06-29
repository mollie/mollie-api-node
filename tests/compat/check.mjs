// Cross-runtime compatibility check.
//
// Unlike the Jest tests (which import `../../src`), this runs against an INSTALLED `@mollie/api-client`, imported by
// package name so module resolution is exercised. Run it under Node, Bun, or Deno (see .github/workflows/test.yml): it
// verifies the package installs, resolves, constructs a client with its binders attached, and that a request
// round-trips to the Mollie API as a `MollieApiError` (i.e. the HTTP transport works on this runtime). It uses the
// NAMED import deliberately — the default import is not callable on Deno until the `exports` map lands. A bogus API key
// is used, so no credentials are required; the expected result is an authentication error.
import { createMollieClient, MollieApiError, PaymentMethod } from '@mollie/api-client';

const assert = (condition, message) => {
  if (!condition) throw new Error('COMPAT FAIL: ' + message);
};

// Named export resolves to the factory.
assert(typeof createMollieClient === 'function', `createMollieClient named export is ${typeof createMollieClient}, not a function`);

// Enum exports resolve.
assert(PaymentMethod?.creditcard === 'creditcard', 'enum export PaymentMethod did not resolve');

// Construct + binders attached.
const mollieClient = createMollieClient({ apiKey: 'test_' + 'x'.repeat(30) });
assert(typeof mollieClient.payments?.page === 'function', 'client.payments.page missing — binders not attached');
assert(typeof mollieClient.payments?.create === 'function', 'client.payments.create missing — binders not attached');

// End-to-end transport: a bogus key must reach Mollie and come back as a MollieApiError, not a transport error.
let error;
try {
  await mollieClient.payments.page({ limit: 1 });
} catch (caught) {
  error = caught;
}
assert(error != undefined, 'request with a bogus key unexpectedly succeeded');
assert(error instanceof MollieApiError, `expected a MollieApiError (transport reached Mollie), got ${error?.constructor?.name}: ${error?.message ?? error}`);

console.log('COMPAT OK');
