import { MollieApiError, MollieClient, OAuthGrantType, PaymentCreateParams } from '../..';
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

  const oauthEndpoint = { basePath: 'https://api.mollie.com:443', path: '/oauth2/tokens' };

  test('OAuth invalid credentials (401)', async () => {
    expect.assertions(3);
    networkMocker
      .intercept('POST', oauthEndpoint, 401, {
        status: 401,
        title: 'Unauthorized Request',
        detail: 'Missing authentication, or failed to authenticate',
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/overview/authentication',
            type: 'text/html',
          },
        },
      })
      .twice();

    try {
      await bluster(mollieClient.oauth.create.bind(mollieClient.oauth))({
        clientId: 'app_invalid',
        clientSecret: 'invalid_secret',
        grant_type: OAuthGrantType.authorization_code,
        code: 'auth_code_test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect((error as MollieApiError).statusCode).toBe(401);
      expect((error as MollieApiError).message).toBe('Missing authentication, or failed to authenticate');
    }
  });

  test('OAuth invalid grant (422)', async () => {
    expect.assertions(4);
    networkMocker
      .intercept('POST', oauthEndpoint, 422, {
        status: 422,
        title: 'Unprocessable Entity',
        detail: 'The authorization code is invalid or has expired',
        field: 'code',
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/oauth-generate-tokens',
            type: 'text/html',
          },
        },
      })
      .twice();

    try {
      await bluster(mollieClient.oauth.create.bind(mollieClient.oauth))({
        clientId: 'app_test123',
        clientSecret: 'secret_test456',
        grant_type: OAuthGrantType.authorization_code,
        code: 'expired_code',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(MollieApiError);
      expect((error as MollieApiError).statusCode).toBe(422);
      expect((error as MollieApiError).field).toBe('code');
      expect((error as MollieApiError).message).toBe('The authorization code is invalid or has expired');
    }
  });

  afterAll(() => networkMocker.cleanup());
});
