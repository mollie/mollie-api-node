import axios from 'axios';
import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = 'http';

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('customers', () => {
  it('should integrate', async () => {
    const customers = await mollieClient.customers.page();

    expect(customers).toBeDefined();

    const [mandates, payments, subscriptions] = await Promise.all([
      mollieClient.customerMandates.page({
        customerId: customers[0].id,
      }),
      mollieClient.customerPayments.page({
        customerId: customers[0].id,
      }),
      mollieClient.customerSubscriptions.page({
        customerId: customers[0].id,
      }),
    ]);

    expect(mandates).toBeDefined();
    expect(payments).toBeDefined();
    expect(subscriptions).toBeDefined();

    if (mandates[0]) {
      const mandate = await mollieClient.customerMandates.get(mandates[0].id, { customerId: customers[0].id });
      expect(mandate).toBeDefined();
    }
    if (payments[0]) {
      const payment = await mollieClient.payments.get(payments[0].id);
      expect(payment).toBeDefined();
    }
    if (subscriptions[0]) {
      try {
        const subscription = await mollieClient.customerSubscriptions.get(subscriptions[0].id, { customerId: customers[0].id });
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

  it('should refresh', async () => {
    // Create a customer.
    const originalCustomer = await mollieClient.customers.create({
      email: 'john@example.org',
      name: 'John Doe',
    });
    // Update the customer.
    await mollieClient.customers.update(originalCustomer.id, { name: 'Johnny Domen' });
    // Get the updated customer.
    const updatedCustomer = await originalCustomer.refresh();
    expect(originalCustomer.name).toBe('John Doe');
    expect(updatedCustomer.name).toBe('Johnny Domen');
  });
});
