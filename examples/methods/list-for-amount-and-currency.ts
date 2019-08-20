/**
 * @docs https://docs.mollie.com/payments/multicurrency#filtering-payment-methods
 */
import createMollieClient, { List, Method, MethodInclude } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const filteredMethods: List<Method> = await mollieClient.methods.all({
      include: MethodInclude.issuers,
      amount: {
        value: '10.00',
        currency: 'SEK',
      },
    });

    console.log(filteredMethods);
  } catch (error) {
    console.warn(error);
  }
})();
