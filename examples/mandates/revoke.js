/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mandate = await mollieClient.customers_mandates.revoke('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(mandate);
  } catch (e) {
    console.log(e);
  }
})();
