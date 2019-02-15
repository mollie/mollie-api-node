import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import Payment from '../../src/models/Payment';

let mollie;
if (process.env.RUN_THE_ACTUAL_BUILD === 'true' || process.env.RUN_THE_ACTUAL_BUILD === 'cjs') {
  mollie = require('../../dist/cjs/mollie');
} else {
  mollie = require('../../src/mollie').default;
}

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

describe('payments', () => {
  it('should integrate', (done) => {
    mollieClient.payments
      .all()
      .then((payments: Array<Payment>) => {
        let paymentExists;

        if (!payments.length || payments[0].isExpired()) {
          paymentExists = mollieClient.payments
            .create({
              amount: { value: '10.00', currency: 'EUR' },
              description: 'Integration test payment',
              redirectUrl: 'https://example.com/redirect',
            })
            .then((payment) => {
              expect(payment).toBeDefined();

              return payment;
            })
            .catch(err => expect(err).toBeNull());
        } else {
          paymentExists = Promise.resolve(payments[0]);
        }

        paymentExists.then((payment) => {
          if (!payment.isPaid()) {
            console.log(
              'If you want to test the full flow, set the payment to paid:',
              payment.getPaymentUrl(),
            );
            done();
            return;
          }

          if (!payment.isRefundable()) {
            console.log('This payment is not refundable, you cannot test the full flow.');
            done();
            return;
          }

          mollieClient.payments_refunds
            .all({ paymentId: payment.id })
            .then((paymentRefunds) => {
              let refundExists;

              if (!paymentRefunds.length) {
                refundExists = mollieClient.payments_refunds
                  .create({
                    paymentId: payments[0].id,
                    amount: { value: '5.00', currency: payments[0].amount.currency },
                  })
                  .then((refund) => {
                    expect(refund).toBeDefined();

                    return refund;
                  })
                  .catch(err => expect(err).toBeNull());
              } else {
                refundExists = Promise.resolve(paymentRefunds[0]);
              }

              refundExists.then((paymentRefund) => {
                mollieClient.payments_refunds
                  .get(paymentRefund.id, {
                    paymentId: payments[0].id,
                  })
                  .then((result) => {
                    expect(result).toBeDefined();
                    done();
                  })
                  .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                  });
              });
            })
            .catch((err) => {
              expect(err).toBeUndefined();
              done();
            });
        });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });
  });

  it('should paginate', (done) => {
    let nextPaymentCursor;

    mollieClient.payments
      .all({
        limit: 2,
      })
      .then((payments) => {
        expect(payments.length).toEqual(2);
        expect(payments.nextPageCursor).toBeDefined();
        expect(payments.previousPageCursor).toBeUndefined();

        nextPaymentCursor = payments.nextPageCursor;

        // Second page
        payments
          .nextPage()
          .then((nextPaymentsList) => {
            expect(nextPaymentsList.length).toEqual(2);
            expect(nextPaymentsList[0].id).toEqual(nextPaymentCursor);
            expect(nextPaymentsList.nextPageCursor).toBeDefined();
            expect(nextPaymentsList.previousPageCursor).toBeDefined();

            // Third (and last) page
            nextPaymentsList.nextPage().then((lastPaymentsList) => {
              expect(lastPaymentsList.length).toEqual(2);
              expect(nextPaymentsList.nextPageCursor).toEqual(lastPaymentsList[0].id);

              done();
            });
          })
          .catch((err) => {
            expect(err).toBeUndefined();
            done();
          });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });
  });
});
