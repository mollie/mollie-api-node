/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
import createMollieClient, { Payment, SequenceType } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const customerId = 'cst_pzhEvnttJ2';

    const payment: Payment = await mollieClient.customers_payments.create({
      amount: { value: '10.00', currency: 'EUR' },
      description: 'Recurring payment',
      redirectUrl: 'https://example.org/redirect',
      webhookUrl: 'http://example.org/webhook',
      metadata: { orderId: 'Order #23' },
      customerId,
      sequenceType: SequenceType.recurring,
    });

    console.log(payment);
  } catch (e) {
    console.log(e);
  }
})();
