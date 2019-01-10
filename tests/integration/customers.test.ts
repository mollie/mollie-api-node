import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import mollie from '../../src/mollie';

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
    mollieClient.customers
      .all()
      .then((customers) => {
        expect(customers).toBeDefined();

        const mandates = mollieClient.customers_mandates.list({
          customerId: customers[0].id,
        });
        const payments = mollieClient.customers_payments.list({
          customerId: customers[0].id,
        });
        const subscriptions = mollieClient.customers_subscriptions.list({
          customerId: customers[0].id,
        });

        Promise.all([mandates, payments, subscriptions])
          .then(([mandates, payments, subscriptions]) => {
            expect(mandates).toBeDefined();
            expect(payments).toBeDefined();
            expect(subscriptions).toBeDefined();

            const mandate = mandates[0]
              ? mollieClient.customers_mandates.get(mandates[0].id, {
                  customerId: customers[0].id,
                })
              : Promise.resolve('true');
            const payment = payments[0]
              ? mollieClient.payments.get(payments[0].id)
              : Promise.resolve('true');
            const subscription = subscriptions[0]
              ? mollieClient.customers_subscriptions.get(subscriptions[0].id, {
                  customerId: customers[0].id,
                })
              : Promise.resolve('true');

            // @ts-ignore
            Promise.all([mandate, payment, subscription])
              .then(([mandate, payment, subscription]) => {
                expect(mandate).toBeDefined();
                expect(payment).toBeDefined();
                expect(subscription).toBeDefined();
                done();
              })
              .catch((err) => {
                expect(err).toEqual({
                  error: {
                    message: 'The subscription has been cancelled',
                    type: 'request',
                  },
                });
                done();
              });
          })
          .catch(err => {
            expect(err).toBeUndefined();
            done();
          });
      })
      .catch(err => {
        expect(err).toBeUndefined();
        done();
      }));
});
