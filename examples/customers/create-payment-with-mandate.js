/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const payment = await mollieClient.customers_payments.create({
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
  } catch (e) {
    console.log(e);
  }
})();
