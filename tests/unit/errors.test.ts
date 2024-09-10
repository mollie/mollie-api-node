import { MollieApiError, MollieClient, PaymentCreateParams } from '../..';
import NetworkMocker, { getApiKeyClientProvider } from '../NetworkMocker';

describe('errorHandling', () => {
  const networkMocker = new NetworkMocker(getApiKeyClientProvider());
  let mollieClient: MollieClient;

  beforeAll(async () => {
    mollieClient = await networkMocker.prepare();
  });

  test('data property passthrough', async () => {
    expect.assertions(6);
    networkMocker.intercept('GET', '/customers/cst_chinchilla', 404, {
      status: 404,
      title: 'Not Found',
      detail: 'No customer exists with token cst_chinchilla.',
      _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
    }).twice();

    try {
      await bluster(mollieClient.customers.get.bind(mollieClient.customers))('cst_chinchilla');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('No customer exists with token cst_chinchilla.');
      // Ensure the message property survives conversion to and from JSON.
      expect(JSON.parse(JSON.stringify(error)).message).toBe('No customer exists with token cst_chinchilla.');
    }

    networkMocker.intercept('POST', '/payments', 422, {
      status: 422,
      title: 'Unprocessable Entity',
      detail: 'The amount is required for payments',
      field: 'amount',
      _links: { documentation: { href: 'https://docs.mollie.com/guides/handling-errors', type: 'text/html' } },
    }).twice();

    const createPaymentParams = {};
    try {
      await bluster(mollieClient.payments.create.bind(mollieClient.payments))(createPaymentParams as PaymentCreateParams);
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect(error.field).toBe('amount');
      expect(error.message).toBe('The amount is required for payments');
    }
  });

  test('idempotency key retention', async () => {
    expect.assertions(2);
    networkMocker.intercept('POST', '/payments', 900, {
      status: 900,
      title: 'Custom failing error',
    }).twice();

    const createPaymentParams = {
      idempotencyKey: 'mock-key',
    };
    try {
      await bluster(mollieClient.payments.create.bind(mollieClient.payments))(createPaymentParams as PaymentCreateParams);
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect(error.idempotencyKey).toBe('mock-key');
    }
  });

  afterAll(() => networkMocker.cleanup());
});
