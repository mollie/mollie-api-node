import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import mollie from '../../dist/mollie';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

describe('customers', () => {
  it('should integrate', (done) =>
    mollieClient.customers.all()
      .then((customers) => {
        expect(customers).toBeDefined();

        const mandates = mollieClient.customers_mandates.all({ customerId: customers[0].id });
        const payments = mollieClient.customers_payments.all({ customerId: customers[0].id });
        const subscriptions = mollieClient.customers_subscriptions.all({ customerId: customers[0].id });

        Promise.all([mandates, payments, subscriptions])
          .then(([mandates, payments, subscriptions]) => {
            expect(mandates).toBeDefined();
            expect(payments).toBeDefined();
            expect(subscriptions).toBeDefined();

            const mandate = mandates[0]
              ? mollieClient.customers_mandates.get(mandates[0].id, { customerId: customers[0].id })
              : Promise.resolve('true');
            const payment = payments[0]
              ? mollieClient.customers_payments.get(payments[0].id, { customerId: customers[0].id })
              : Promise.resolve('true');
            const subscription = subscriptions[0]
              ? mollieClient.customers_subscriptions.get(subscriptions[0].id, { customerId: customers[0].id })
              : Promise.resolve('true');

            Promise.all([mandate, payment, subscription])
              .then(([mandate, payment, subscription]) => {
                expect(mandate).toBeDefined();
                expect(payment).toBeDefined();
                expect(subscription).toBeDefined();
                done();
              })
              .catch((err) => {
                expect(err).toEqual({ error: { message: "The subscription has been cancelled", type: "request" } });
                done();
              });
          })
          .catch((err) => {
            expect(err).toBeNull();
            done();
          });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      })
  );
});

describe('issuers', () => {
  it('should integrate', (done) => {
    mollieClient.issuers.all()
      .then((issuers) => {
        expect(issuers).toBeDefined();

        mollieClient.issuers.get(issuers[0].id)
          .then((issuer) => {
            expect(issuer).toBeDefined();
            done();
          })
          .catch((err) => {
            expect(err).toBeNull();
            done();
          });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
  });
});

describe('methods', () => {
  it('should integrate', (done) => {
    mollieClient.methods.all()
      .then((methods) => {
        expect(methods).toBeDefined();

        mollieClient.methods.get(methods[0].id)
          .then((method) => {
            expect(method).toBeDefined();
            done();
          })
          .catch((err) => {
            expect(err).toBeNull();
            done();
          });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      })
  });
});

describe('payments', () => {
  it('should integrate', (done) => {
    mollieClient.payments.all()
      .then((payments) => {
        let paymentExists;

        if (!payments.length || payments[0].isExpired()) {
          paymentExists = mollieClient.payments.create({
            amount: 10.00,
            description: 'Integration test payment',
            redirectUrl: 'https://example.com/redirect',
          })
            .then(payment => expect(payment).toBeDefined())
            .catch(err => expect(err).toBeNull());
        } else {
          paymentExists = Promise.resolve(payments[0]);
        }

        paymentExists.then((payment) => {
          /**
           * If you want to test the rest of this flow you have to
           * manually set this payment to paid.
           */
          if (!payment.isPaid()) {
            done();
          }

          mollieClient.payments_refunds.all({ paymentId: payment.id })
            .then((paymentRefunds) => {
              let refundExists;

              if (!paymentRefunds.length) {
                refundExists = mollieClient.payments_refunds.create({
                  paymentId: payments[0].id,
                  amount: 5.00,
                }).then((result) => {
                  expect(result).toBeDefined();
                  return result;
                }).catch((err) => {
                  expect(err).toBeNull();
                });
              } else {
                refundExists = Promise.resolve(paymentRefunds[0]);
              }

              refundExists.then((paymentRefund) => {
                mollieClient.payments_refunds.get(paymentRefund.id, {
                  paymentId: payments[0].id,
                }).then((result) => {
                  expect(result).toBeDefined();
                  done();
                }).catch((err) => {
                  expect(err).toBeNull();
                  done();
                });
              });
            })
            .catch((err) => {
              expect(err).toBeNull();
              done();
            });
        });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
  });
});

describe('refunds', () => {
  it('should integrate', () =>
    mollieClient.refunds.all()
      .then(refunds => expect(refunds).toBeDefined())
      .catch(err => expect(err).toBeNull())
  );
});
