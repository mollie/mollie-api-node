import { PaymentCreateParams } from '../..';
import wireMockClient from '../wireMockClient';
import callAsync from '../callAsync';

test('errorHandling', async () => {
  expect.assertions(5);

  const { adapter, client } = wireMockClient();

  adapter.onGet('/customers/cst_chinchilla').reply(404, {
    status: 404,
    title: 'Not Found',
    detail: 'No customer exists with token cst_chinchilla.',
    _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
  });

  try {
    await callAsync(client.customers.get, client.customers, 'cst_chinchilla');
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('No customer exists with token cst_chinchilla.');
  }

  adapter.onPost('/payments').reply(422, {
    status: 422,
    title: 'Unprocessable Entity',
    detail: 'The amount is required for payments',
    field: 'amount',
    _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
  });

  try {
    const createPaymentParams = {};

    await callAsync(client.payments.create, client.payments, createPaymentParams as PaymentCreateParams);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.field).toBe('amount');
    expect(error.message).toBe('The amount is required for payments');
  }
});
