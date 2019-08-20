/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
import createMollieClient, { Payment, SequenceType } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment: Payment = await mollieClient.customers_payments.create({
      customerId: 'cst_6ruhPN4V5Q',
      amount: {
        currency: 'EUR',
        value: '10.00',
      },
      description: 'Order #12345',
      sequenceType: SequenceType.first,
      redirectUrl: 'https://webshop.example.org/order/12345/',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
