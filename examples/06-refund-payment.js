/**
 * Example 06 - How to refund a Payment.
 *
 * @see https://www.mollie.com/en/docs/reference/refunds/create
 */

const mollie = require('@mollie/api-client');

const mollieClient = mollie({ apiKey: 'test_buC3bBQfSQhd4dDUeMctJjDCn3GhP4' });

mollieClient.payments_refunds
  .create({
    paymentId: 'tr_Vw3BTrxd9C',
    amount: {
      value: '5.00',
      currency: 'EUR',
    },
  })
  .then((refund) => {
    // New refund (#`refund.id`) created with amount: `refund.amount`.
  })
  .catch((error) => {
    // Do some proper error handling.
  });
