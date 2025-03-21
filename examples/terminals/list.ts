/**
 * @docs https://docs.mollie.com/reference/v2/terminals-api/list-terminals
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const terminals = await mollieClient.terminals.page({});

    console.log(terminals);
  } catch (error) {
    console.warn(error);
  }
})();
