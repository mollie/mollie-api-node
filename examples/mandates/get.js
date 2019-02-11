/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/get-mandate
 */
const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mandate = await mollieClient.customers_mandates.get('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(mandate);
  } catch (e) {
    console.log(e);
  }
})();
