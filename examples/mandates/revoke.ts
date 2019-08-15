/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const result: boolean = await mollieClient.customers_mandates.revoke('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();
