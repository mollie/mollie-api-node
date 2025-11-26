import type NetworkClient from '../../communication/NetworkClient';
import type Token from '../../data/oauth/data';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import { type CreateParameters, type RevokeParameters } from './parameters';

const endpoint = 'https://api.mollie.com/oauth2/tokens';

const generateToken = (clientId: string, clientSecret: string) => Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export default class OAuthBinder {
  constructor(protected readonly networkClient: NetworkClient) {}

  /**
   * Makes an OAuth API request with Basic authentication.
   * OAuth token endpoints require application/x-www-form-urlencoded body encoding
   * and Basic auth with client credentials (different from standard Mollie API).
   */
  protected request<T>(method: string, basicAuthToken: string, data: Record<string, string> = {}): Promise<T> {
    return this.networkClient.rawRequest<T>(endpoint, {
      method,
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams(data).toString(),
    });
  }

  /**
   * Exchange the authorization code for an access token, or refresh an existing access token.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/oauth-generate-tokens
   */
  public create(parameters: CreateParameters): Promise<Token>;
  public create(parameters: CreateParameters, callback: Callback<Token>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { clientId, clientSecret, ...data } = parameters;
    return this.request<Token>('POST', generateToken(clientId, clientSecret), data);
  }

  /**
   * Revoke an access token or refresh token. Once revoked, the token can no longer be used.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/oauth-revoke-tokens
   */
  public revoke(parameters: RevokeParameters): Promise<true>;
  public revoke(parameters: RevokeParameters, callback: Callback<true>): void;
  public revoke(parameters: RevokeParameters) {
    if (renege(this, this.revoke, ...arguments)) return;
    const { clientId, clientSecret, ...data } = parameters;
    return this.request<true>('DELETE', generateToken(clientId, clientSecret), data);
  }
}
