import { apply } from 'ruply';
import createMollieClient, { OAuthGrantType, OAuthTokenType } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

const oauthEndpoint = { basePath: 'https://api.mollie.com:443', path: '/oauth2/tokens' };

// Test constants
const TEST_CLIENT_ID = 'app_test123';
const TEST_CLIENT_SECRET = 'secret_test456';
const TEST_ACCESS_TOKEN = 'access_testtoken123';
const TEST_ACCESS_TOKEN_NEW = 'access_newtesttoken456';
const TEST_REFRESH_TOKEN = 'refresh_testtoken789';
const TEST_AUTH_CODE = 'auth_code_test012';

function decodeBasicAuth(authHeader: string): { clientId: string; clientSecret: string } {
  const base64 = authHeader.replace('Basic ', '');
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [clientId, clientSecret] = decoded.split(':');
  return { clientId, clientSecret };
}

function parseFormUrlEncoded(body: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(body));
}

describe('oauth', () => {
  describe('create', () => {
    it('exchanges authorization code for tokens', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
        let capturedBody: string | undefined;
        let capturedHeaders: Record<string, string[]> | undefined;

        networkMocker
          .spy('POST', oauthEndpoint, (body, headers) =>
            apply(
              [
                200,
                {
                  access_token: TEST_ACCESS_TOKEN,
                  refresh_token: TEST_REFRESH_TOKEN,
                  expires_in: 3600,
                  token_type: 'bearer',
                  scope: 'payments.read payments.write',
                },
              ] as const,
              () => {
                capturedBody = body as string;
                capturedHeaders = headers;
              },
            ),
          )
          .twice();

        const token = await bluster(mollieClient.oauth.create.bind(mollieClient.oauth))({
          clientId: TEST_CLIENT_ID,
          clientSecret: TEST_CLIENT_SECRET,
          grant_type: OAuthGrantType.authorization_code,
          code: TEST_AUTH_CODE,
          redirect_uri: 'https://example.com/callback',
        });

        // Verify response
        expect(token.access_token).toBe(TEST_ACCESS_TOKEN);
        expect(token.refresh_token).toBe(TEST_REFRESH_TOKEN);
        expect(token.expires_in).toBe(3600);
        expect(token.token_type).toBe('bearer');
        expect(token.scope).toBe('payments.read payments.write');

        // Verify Basic Auth header
        expect(capturedHeaders!['authorization'][0]).toMatch(/^Basic /);
        const { clientId, clientSecret } = decodeBasicAuth(capturedHeaders!['authorization'][0]);
        expect(clientId).toBe(TEST_CLIENT_ID);
        expect(clientSecret).toBe(TEST_CLIENT_SECRET);

        // Verify Content-Type header
        expect(capturedHeaders!['content-type'][0]).toBe('application/x-www-form-urlencoded');

        // Verify form-encoded body
        const parsedBody = parseFormUrlEncoded(capturedBody!);
        expect(parsedBody['grant_type']).toBe('authorization_code');
        expect(parsedBody['code']).toBe(TEST_AUTH_CODE);
        expect(parsedBody['redirect_uri']).toBe('https://example.com/callback');
        // Client credentials should NOT be in body (they go in Basic Auth header)
        expect(parsedBody['clientId']).toBeUndefined();
        expect(parsedBody['clientSecret']).toBeUndefined();
      });
    });

    it('refreshes access token with refresh token', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
        let capturedBody: string | undefined;
        let capturedHeaders: Record<string, string[]> | undefined;

        networkMocker
          .spy('POST', oauthEndpoint, (body, headers) =>
            apply(
              [
                200,
                {
                  access_token: TEST_ACCESS_TOKEN_NEW,
                  refresh_token: TEST_REFRESH_TOKEN,
                  expires_in: 3600,
                  token_type: 'bearer',
                  scope: 'payments.read payments.write',
                },
              ] as const,
              () => {
                capturedBody = body as string;
                capturedHeaders = headers;
              },
            ),
          )
          .twice();

        const token = await bluster(mollieClient.oauth.create.bind(mollieClient.oauth))({
          clientId: TEST_CLIENT_ID,
          clientSecret: TEST_CLIENT_SECRET,
          grant_type: OAuthGrantType.refresh_token,
          refresh_token: TEST_REFRESH_TOKEN,
        });

        // Verify response
        expect(token.access_token).toBe(TEST_ACCESS_TOKEN_NEW);
        expect(token.refresh_token).toBe(TEST_REFRESH_TOKEN);

        // Verify Basic Auth header
        const { clientId, clientSecret } = decodeBasicAuth(capturedHeaders!['authorization'][0]);
        expect(clientId).toBe(TEST_CLIENT_ID);
        expect(clientSecret).toBe(TEST_CLIENT_SECRET);

        // Verify form-encoded body
        const parsedBody = parseFormUrlEncoded(capturedBody!);
        expect(parsedBody['grant_type']).toBe('refresh_token');
        expect(parsedBody['refresh_token']).toBe(TEST_REFRESH_TOKEN);
        // code should not be present when using refresh_token grant
        expect(parsedBody['code']).toBeUndefined();
      });
    });
  });

  describe('revoke', () => {
    it('revokes an access token', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
        let capturedBody: string | undefined;
        let capturedHeaders: Record<string, string[]> | undefined;

        networkMocker
          .spy('DELETE', oauthEndpoint, (body, headers) =>
            apply([204, ''] as const, () => {
              capturedBody = body as string;
              capturedHeaders = headers;
            }),
          )
          .twice();

        const result = await bluster(mollieClient.oauth.revoke.bind(mollieClient.oauth))({
          clientId: TEST_CLIENT_ID,
          clientSecret: TEST_CLIENT_SECRET,
          token_type_hint: OAuthTokenType.access_token,
          token: TEST_ACCESS_TOKEN,
        });

        // Verify response (204 returns true)
        expect(result).toBe(true);

        // Verify Basic Auth header
        const { clientId, clientSecret } = decodeBasicAuth(capturedHeaders!['authorization'][0]);
        expect(clientId).toBe(TEST_CLIENT_ID);
        expect(clientSecret).toBe(TEST_CLIENT_SECRET);

        // Verify Content-Type header
        expect(capturedHeaders!['content-type'][0]).toBe('application/x-www-form-urlencoded');

        // Verify form-encoded body
        const parsedBody = parseFormUrlEncoded(capturedBody!);
        expect(parsedBody['token_type_hint']).toBe('access_token');
        expect(parsedBody['token']).toBe(TEST_ACCESS_TOKEN);
      });
    });

    it('revokes a refresh token', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
        let capturedBody: string | undefined;

        networkMocker
          .spy('DELETE', oauthEndpoint, (body, _) =>
            apply([204, ''] as const, () => {
              capturedBody = body as string;
            }),
          )
          .twice();

        const result = await bluster(mollieClient.oauth.revoke.bind(mollieClient.oauth))({
          clientId: TEST_CLIENT_ID,
          clientSecret: TEST_CLIENT_SECRET,
          token_type_hint: OAuthTokenType.refresh_token,
          token: TEST_REFRESH_TOKEN,
        });

        expect(result).toBe(true);

        const parsedBody = parseFormUrlEncoded(capturedBody!);
        expect(parsedBody['token_type_hint']).toBe('refresh_token');
        expect(parsedBody['token']).toBe(TEST_REFRESH_TOKEN);
      });
    });
  });

  describe('binder availability', () => {
    it('oauth binder is available', () => {
      const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
      expect(mollieClient).toHaveProperty('oauth');
      expect(mollieClient.oauth).toHaveProperty('create');
      expect(mollieClient.oauth).toHaveProperty('revoke');
      expect(typeof mollieClient.oauth.create).toBe('function');
      expect(typeof mollieClient.oauth.revoke).toBe('function');
    });
  });
});
