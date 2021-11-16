import axios from 'axios';
import dotenv from 'dotenv';
import nock, { BackMode } from 'nock';
import { setupRecorder } from 'nock-record';
import { apply, run } from 'ruply';
import createMollieClient, { MollieClient } from '..';

const { apiKey, oauthAuthorizationHeaderValue, refreshToken } = run(dotenv.config().parsed!, ({ API_KEY, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN }) => ({
  apiKey: API_KEY,
  oauthAuthorizationHeaderValue: `Basic: ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  refreshToken: REFRESH_TOKEN,
}));

/**
 * Creates a client with the API key from the environment variables.
 */
export function apiKeyClientFactory() {
  return Promise.resolve(createMollieClient({ apiKey }));
}

/**
 * Creates a client with an access token to be used in a test, based on the refresh token from the environment
 * variables.
 */
export async function accessTokenClientFactory(mockNetwork: boolean) {
  if (mockNetwork) {
    return createMollieClient({ accessToken: 'access_mock' });
  }
  const { data } = await axios.post(
    'https://api.mollie.com/oauth2/tokens',
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    { headers: { Authorization: oauthAuthorizationHeaderValue } },
  );
  return apply(createMollieClient({ accessToken: data.access_token }), client => ((client as { accessToken?: string }).accessToken = data.access_token));
}

/**
 * A helper for tests. It either records communication with the Mollie API (when `mockNetwork` is `false`) or uses
 * existing recordings to simulate the network (when `mockNetwork` is `true`).
 */
export default class NetworkMocker {
  protected readonly clientFactory: () => Promise<MollieClient>;
  protected readonly nockMode: BackMode;
  protected completeRecording: (() => void) | undefined;
  constructor(mockNetwork: boolean, clientFactory: (mockNetwork: boolean) => Promise<MollieClient>, protected readonly networkFixtureName: string) {
    this.clientFactory = clientFactory.bind(undefined, mockNetwork);
    this.nockMode = mockNetwork ? 'lockdown' : 'update';
  }

  async prepare() {
    // Activate Nock.
    if (nock.isActive() === false) {
      nock.activate();
    }
    // Create the client.
    const mollieClient = await this.clientFactory();
    // Start recording network traffic.
    await apply(setupRecorder({ mode: this.nockMode })(this.networkFixtureName), ({ completeRecording }) => (this.completeRecording = completeRecording));
    return mollieClient;
  }

  cleanup() {
    // Deactivate Nock (for other tests which might not expect Nock's monkey patch).
    nock.restore();
    // Stop recording network traffic.
    if (this.completeRecording == undefined) {
      throw new Error('cleanup called before prepare');
    }
    this.completeRecording();
  }
}
