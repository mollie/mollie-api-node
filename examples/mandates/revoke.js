/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const mandate = await mollieClient.customers_mandates.revoke('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(mandate);
  } catch (e) {
    console.log(e);
  }
})();
