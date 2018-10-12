/**
 * @docs https://docs.mollie.com/reference/v2/payments-api/create-payment
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00', // You must send the correct number of decimals, thus we enforce the use of strings
      },
      description: 'My first payment',
      redirectUrl: 'https://webshop.example.org/order/12345/',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
      metadata: {
        order_id: '12345',
      },
    });

    console.log(payment);
  } catch (e) {
    console.log(e);
  }
})();
