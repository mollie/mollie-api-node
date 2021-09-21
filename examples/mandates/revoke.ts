/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const status: boolean = await mollieClient.customersMandates.revoke('mdt_7UmCdnzAfH', {
      customerId: 'cst_pzhEvnttJ2',
    });

    console.log(status);
  } catch (error) {
    console.warn(error);
  }
})();
