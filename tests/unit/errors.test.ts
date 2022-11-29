import { MollieApiError, PaymentCreateParams } from '../..';
import wireMockClient from '../wireMockClient';

describe('errorHandling', () => {
  const { adapter, client } = wireMockClient();

  test('data property passthrough', async () => {
    expect.assertions(6);
    adapter.onGet('/customers/cst_chinchilla').reply(404, {
      status: 404,
      title: 'Not Found',
      detail: 'No customer exists with token cst_chinchilla.',
      _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
    });

    try {
      await bluster(client.customers.get.bind(client.customers))('cst_chinchilla');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('No customer exists with token cst_chinchilla.');
      // Ensure the message property survives conversion to and from JSON.
      expect(JSON.parse(JSON.stringify(error)).message).toBe('No customer exists with token cst_chinchilla.');
    }

    adapter.onPost('/payments').reply(422, {
      status: 422,
      title: 'Unprocessable Entity',
      detail: 'The amount is required for payments',
      field: 'amount',
      _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
    });

    const createPaymentParams = {};
    try {
      await bluster(client.payments.create.bind(client.payments))(createPaymentParams as PaymentCreateParams);
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect(error.field).toBe('amount');
      expect(error.message).toBe('The amount is required for payments');
    }
  });

  test('idempotency key retention', async () => {
    expect.assertions(2);
    adapter.onPost('/payments').reply(900, {
      status: 900,
      title: 'Custom failing error',
    });

    const createPaymentParams = {
      idempotencyKey: 'mock-key',
    };
    try {
      await bluster(client.payments.create.bind(client.payments))(createPaymentParams as PaymentCreateParams);
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect(error.idempotencyKey).toBe('mock-key');
    }
  });
});
