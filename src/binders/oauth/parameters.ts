import { type GrantType, type TokenType } from '../../data/oauth/data';

/**
 * OAuth client credentials used for Basic Auth header.
 */
interface OAuthCredentials {
  /**
   * OAuth application client ID, starting with `'app_'`.
   *
   * @see https://docs.mollie.com/reference/oauth-api
   */
  clientId: string;
  /**
   * OAuth application client secret.
   *
   * @see https://docs.mollie.com/reference/oauth-api
   */
  clientSecret: string;
}

interface AuthorizationCodeGrant {
  /**
   * Use `authorization_code` to exchange an authorization code for an access token.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=grant_type#body-params
   */
  grant_type: GrantType.authorization_code;
  /**
   * The authorization code you received when creating the authorization.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=code#body-params
   */
  code: string;
}

interface RefreshTokenGrant {
  /**
   * Use `refresh_token` to renew your app access token with your refresh token.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=grant_type#body-params
   */
  grant_type: GrantType.refresh_token;
  /**
   * The refresh token you received when creating the authorization.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=refresh_token#body-params
   */
  refresh_token: string;
}

/**
 * Discriminated union based on `grant_type`:
 * - `authorization_code`: requires `code`
 * - `refresh_token`: requires `refresh_token`
 */
type GrantParameters = AuthorizationCodeGrant | RefreshTokenGrant;

export type CreateParameters = OAuthCredentials &
  GrantParameters & {
    /**
     * The URL the merchant is sent back to once the request has been authorized.
     * It must match the URL you set when registering your app.
     *
     * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=redirect_uri#body-params
     */
    redirect_uri?: string;
  };

export type RevokeParameters = OAuthCredentials & {
  /**
   * The type of token you want to revoke.
   *
   * @see https://docs.mollie.com/reference/oauth-revoke-tokens?path=token_type_hint#body-params
   */
  token_type_hint: TokenType;
  /**
   * The token you want to revoke.
   *
   * @see https://docs.mollie.com/reference/oauth-revoke-tokens?path=token#body-params
   */
  token: string;
};
