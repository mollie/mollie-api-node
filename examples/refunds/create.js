/**
 * @docs https://docs.mollie.com/reference/v2/refunds-api/create-refund
 */
(async () => {
  const mollie = require('@mollie/api-client');
  const mollieClient = mollie({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

  try {
    const refund = await mollieClient.payments_refunds.create({
      paymentId: 'tr_x5Sj9HU83J',
      amount: {
        value: '5.00',
        currency: 'EUR',
      },
    });

    console.log(refund);
  } catch (e) {
    console.log(e);
  }
})();
