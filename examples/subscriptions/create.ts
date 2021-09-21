/**
 * @docs https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
 */
import createMollieClient, { Subscription } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const subscription: Subscription = await mollieClient.customersSubscriptions.create({
      customerId: 'cst_pzhEvnttJ2',
      amount: { value: '24.00', currency: 'EUR' },
      times: 4,
      interval: '3 months',
      description: 'Quarterly payment',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
    });

    console.log(subscription);
  } catch (error) {
    console.warn(error);
  }
})();
