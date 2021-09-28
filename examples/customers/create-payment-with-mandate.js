/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const payment = await mollieClient.customerPayments.create({
      customerId: 'cst_6ruhPN4V5Q',
      amount: {
        currency: 'EUR',
        value: '10.00',
      },
      description: 'Order #12345',
      sequenceType: 'first',
      redirectUrl: 'https://webshop.example.org/order/12345/',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})();
