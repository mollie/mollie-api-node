/**
 * Example 06 - How to refund a Payment.
 *
 * @see https://www.mollie.com/en/docs/reference/refunds/create
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

mollieClient.paymentRefunds
  .create({
    paymentId: 'tr_Vw3BTrxd9C',
    amount: {
      value: '5.00',
      currency: 'EUR',
    },
  })
  .then(refund => {
    // New refund (#`refund.id`) created with amount: `refund.amount`.
  })
  .catch(error => {
    // Do some proper error handling.
  });
