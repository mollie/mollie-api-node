/**
 * @docs https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
import createMollieClient, { List, Method } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const methods: List<Method> = await mollieClient.methods.list();

    console.log(methods);
  } catch (error) {
    console.warn(error);
  }
})();
