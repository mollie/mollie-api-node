import axios from 'axios';
import dotenv from 'dotenv';

/**
 * Gets an access token to be used in a test, based on the refresh token in the environment variables.
 */
export default function getAccessToken() {
  const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret, REFRESH_TOKEN: refreshToken } = dotenv.config().parsed!;
  const authorizationHeaderValue = `Basic: ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  return axios
    .post(
      'https://api.mollie.com/oauth2/tokens',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      { headers: { Authorization: authorizationHeaderValue } },
    )
    .then(({ data }) => data.access_token);
}
