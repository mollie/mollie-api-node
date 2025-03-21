/**
 * @docs https://docs.mollie.com/reference/v2/terminals-api/get-terminal
 */
import createMollieClient from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const terminal = await mollieClient.terminals.get('term_7MgL4wea46qkRcoTZjWEH');

    console.log(terminal);
  } catch (error) {
    console.warn(error);
  }
})();
