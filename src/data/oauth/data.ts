/**
 * OAuth token response data.
 *
 * @see https://docs.mollie.com/reference/oauth-generate-tokens
 */
export default interface Token {
  /**
   * The app access token, with which you will be able to access the Mollie API on the merchant's behalf.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=access_token#response
   */
  access_token: string;
  /**
   * The refresh token, with which you will be able to retrieve new app access tokens on this endpoint.
   * The refresh token does not expire.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=refresh_token#response
   */
  refresh_token: string;
  /**
   * The number of seconds left before the app access token expires.
   * Be sure to renew your app access token before this reaches zero.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=expires_in#response
   */
  expires_in: number;
  /**
   * As per OAuth standards, the provided app access token can only be used with `bearer` authentication.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=token_type#response
   */
  token_type: 'bearer';
  /**
   * A space-separated list of permissions.
   *
   * @see https://docs.mollie.com/reference/oauth-generate-tokens?path=scope#response
   */
  scope: string;
}

export enum GrantType {
  authorization_code = 'authorization_code',
  refresh_token = 'refresh_token',
}

export enum TokenType {
  access_token = 'access_token',
  refresh_token = 'refresh_token',
}
