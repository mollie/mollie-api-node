import axios from 'axios';
import dotenv from 'dotenv';
import nock, { BackMode } from 'nock';
import { setupRecorder } from 'nock-record';
import { apply, run } from 'ruply';
import createMollieClient, { MollieClient } from '..';
import fling from '../src/plumbing/fling';

type MaybePromise<T> = T | Promise<T>;

/**
 * Returns a mode which creates a client with an API key. This API key is obtained from the environment variables
 * unless `mockAuthorization` is set to `true`.
 */
export function getApiKeyClientMode(mockAuthorization = false) {
  if (mockAuthorization) {
    return () => ({ client: createMollieClient({ apiKey: 'test_mock' }) });
  }
  return () => {
    const apiKey = dotenv.config().parsed!.API_KEY;
    return { client: apply(createMollieClient({ apiKey }), client => ((client as { apiKey?: string }).apiKey = apiKey)) };
  };
}

/**
 * Returns a mode which creates a client with an access token. The access token is requested using the refresh token
 * obtained from the environment variables unless `mockAuthorization` is set to `true`.
 */
export function getAccessTokenClientMode(mockAuthorization = false) {
  if (mockAuthorization) {
    return () => ({ client: createMollieClient({ accessToken: 'access_mock' }) });
  }
  return async () => {
    const { oauthAuthorizationHeaderValue, refreshToken } = run(dotenv.config().parsed!, ({ CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN }) => ({
      oauthAuthorizationHeaderValue: `Basic: ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      refreshToken: REFRESH_TOKEN,
    }));
    const { data } = await axios.post(
      'https://api.mollie.com/oauth2/tokens',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      { headers: { Authorization: oauthAuthorizationHeaderValue } },
    );
    const accessToken: string = data['access_token'];
    return { client: apply(createMollieClient({ accessToken }), client => ((client as { accessToken?: string }).accessToken = accessToken)) };
  };
}

/**
 * Wraps the passed mode factory, adding functionality to it which starts and stops Nock Back.
 */
function useNockBack(
  nockMode: BackMode,
  mockAuthorization: boolean,
  getMode: (mockAuthorization: boolean) => () => MaybePromise<{ client: MollieClient; cleanup?: () => void }>,
  networkFixtureName: string,
) {
  return async () => {
    // Activate the original mode.
    const { client, cleanup } = await getMode(mockAuthorization)();
    // Start recording network traffic.
    const { completeRecording } = await setupRecorder({ mode: nockMode })(networkFixtureName);
    return {
      client,
      cleanup: () => {
        // Stop recording network traffic.
        completeRecording();
        // Call the cleanup provided by the original mode (if any).
        cleanup?.();
      },
    };
  };
}

/**
 * Wraps the passed mode factory, adding functionality which records communication with the Mollie API.
 */
export const record = useNockBack.bind(undefined, 'update', false);

/**
 * Wraps the passed mode factory, adding functionality which replays existing recordings of communication with the
 * Mollie API.
 */
export const replay = useNockBack.bind(undefined, 'lockdown', true);

/**
 * A helper for tests. It either records communication with the Mollie API (when `mockNetwork` is `false`) or uses
 * existing recordings to simulate the network (when `mockNetwork` is `true`).
 */
export default class NetworkMocker {
  public cleanup: () => void;
  constructor(protected readonly mode: () => MaybePromise<{ client: MollieClient; cleanup?: () => void }>) {
    this.cleanup = fling.bind(undefined, () => new Error('cleanup called before prepare'));
  }

  async prepare() {
    // Activate Nock.
    if (nock.isActive() === false) {
      nock.activate();
    }
    // Activate the mode.
    const { client, cleanup } = await this.mode();
    // Create the cleanup function.
    this.cleanup = () => {
      // Deactivate Nock (for other tests which might not expect Nock's monkey patch).
      nock.restore();
      // Call the cleanup provided by the mode (if any).
      cleanup?.();
    };
    return client;
  }
}
