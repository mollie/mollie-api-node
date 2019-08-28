import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('customers', () => {
  it('should integrate', async () => {
    const customers = await mollieClient.customers.all();

    expect(customers).toBeDefined();

    const [mandates, payments, subscriptions] = await Promise.all([
      mollieClient.customers_mandates.list({
        customerId: customers[0].id,
      }),
      mollieClient.customers_payments.list({
        customerId: customers[0].id,
      }),
      mollieClient.customers_subscriptions.list({
        customerId: customers[0].id,
      }),
    ]);

    expect(mandates).toBeDefined();
    expect(payments).toBeDefined();
    expect(subscriptions).toBeDefined();

    if (mandates[0]) {
      const mandate = await mollieClient.customers_mandates.get(mandates[0].id, { customerId: customers[0].id });
      expect(mandate).toBeDefined();
    }
    if (payments[0]) {
      const payment = await mollieClient.payments.get(payments[0].id);
      expect(payment).toBeDefined();
    }
    if (subscriptions[0]) {
      try {
        const subscription = await mollieClient.customers_subscriptions.get(subscriptions[0].id, { customerId: customers[0].id });
        expect(subscription).toBeDefined();
      } catch (error) {
        expect(error).toEqual({
          error: {
            message: 'The subscription has been cancelled',
            type: 'request',
          },
        });
      }
    }
  });
});
