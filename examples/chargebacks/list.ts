/**
 * @docs https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
 */
import createMollieClient, { List, Chargeback } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const chargebacks: List<Chargeback> = await mollieClient.chargebacks.all();
    console.log(chargebacks);
  } catch (error) {
    console.error('Something went wrong', error);
  }
})();
