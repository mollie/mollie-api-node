/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const status = await mollieClient.customerMandates.revoke('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(status);
  } catch (error) {
    console.warn(error);
  }
})();
