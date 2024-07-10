import axios from 'axios';
import dotenv from 'dotenv';
import nock, { Interceptor } from 'nock';
import { setupRecorder } from 'nock-record';
import { apply, run } from 'ruply';
import createMollieClient, { MollieClient } from '..';
import fling from '../src/plumbing/fling';

type MaybePromise<T> = T | Promise<T>;

/**
 * Returns a mode which creates a client with an API key. If `mockAuthorization` is set to `false`, this API key is
 * obtained from the environment variables (otherwise a mock API key is used).
 */
export function getApiKeyClientProvider(mockAuthorization = true) {
  if (mockAuthorization) {
    return createMollieClient.bind(undefined, { apiKey: 'test_mock' });
  }
  return () => {
    const apiKey = dotenv.config().parsed!.API_KEY;
    return apply(createMollieClient({ apiKey }), client => ((client as { apiKey?: string }).apiKey = apiKey));
  };
}

/**
 * Returns a mode which creates a client with an access token. If `mockAuthorization` is set to `false`, this access
 * token is requested from the Mollie API using the client ID, client secret, and refresh token from the environment
 * variables (otherwise a mock access token is used).
 */
export function getAccessTokenClientProvider(mockAuthorization = true) {
  if (mockAuthorization) {
    return createMollieClient.bind(undefined, { accessToken: 'access_mock' });
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
    return apply(createMollieClient({ accessToken }), client => ((client as { accessToken?: string }).accessToken = accessToken));
  };
}

class BaseNetworkMocker {
  public cleanup: () => void;
  constructor(protected readonly clientProvider: () => MaybePromise<MollieClient>) {
    this.cleanup = fling.bind(undefined, () => new Error('cleanup called before prepare'));
  }

  async prepare() {
    // Activate Nock.
    if (nock.isActive() === false) {
      nock.activate();
    }
    // Create the cleanup function, which deactivates Nock (for other tests which might not expect Nock's monkey
    // patch).
    this.cleanup = nock.restore;
    // Create the client.
    return this.clientProvider();
  }
}

type InterceptParameters = Parameters<ReturnType<typeof nock>['intercept']>;
type ReplyParameters = Parameters<Interceptor['reply']>;

/**
 * A helper for tests. It creates a Mollie Client, and activates and deactivates Nock.
 */
class NetworkMocker extends BaseNetworkMocker {
  public readonly intercept: (
    method: InterceptParameters[1],
    uri: InterceptParameters[0],
    responseStatusCode: ReplyParameters[0],
    responseBody?: ReplyParameters[1],
    responseHeaders?: ReplyParameters[2],
  ) => nock.Interceptor;
  constructor(clientProvider: () => MaybePromise<MollieClient>) {
    super(clientProvider);
    this.intercept = run(
      nock('https://api.mollie.com:443/v2'),
      scope =>
        function intercept(
          method: InterceptParameters[1],
          uri: InterceptParameters[0],
          responseStatusCode: ReplyParameters[0],
          responseBody?: ReplyParameters[1],
          responseHeaders?: ReplyParameters[2],
        ) {
          const interceptor = scope.intercept(uri, method);
          interceptor.reply(responseStatusCode, responseBody, responseHeaders);
          return interceptor;
        },
    );
  }

  // Consider using Explicit Resource Management (https://github.com/tc39/proposal-explicit-resource-management).
  use<R>(user: (usables: [mollieClient: MollieClient, networkMocker: NetworkMocker]) => MaybePromise<R>) {
    return this.prepare().then(mollieClient => user([mollieClient, this])).finally(this.cleanup);
  }
}

/**
 * A helper for tests. It creates a Mollie Client, activates and deactivates Nock, and either records communication
 * with the Mollie API (when `mode` is `'record'`) or uses existing recordings to simulate the network (when `mode` is
 * `'replay'`).
 */
class AutomaticNetworkMocker extends BaseNetworkMocker {
  protected readonly setupRecorder: () => ReturnType<ReturnType<typeof setupRecorder>>;
  constructor(mode: 'record' | 'replay', getClientProvider: (mockAuthorization: boolean) => () => MaybePromise<MollieClient>, networkFixtureName: string) {
    super(getClientProvider(mode != 'record'));
    this.setupRecorder = () => setupRecorder({ mode: mode == 'record' ? 'update' : 'lockdown' })(networkFixtureName);
  }

  async prepare() {
    const client = await super.prepare();
    // Start recording network traffic.
    const { completeRecording } = await this.setupRecorder();
    // Override the cleanup function, adding a call to stop recording network traffic.
    this.cleanup = run(this.cleanup, cleanup => () => {
      completeRecording();
      cleanup();
    });
    return client;
  }

  // Consider using Explicit Resource Management (https://github.com/tc39/proposal-explicit-resource-management).
  use<R>(user: (mollieClient: MollieClient) => MaybePromise<R>) {
    return this.prepare().then(user).finally(this.cleanup);
  }
}

export default apply(NetworkMocker as typeof NetworkMocker & { Auto: typeof AutomaticNetworkMocker }, NetworkMocker => (NetworkMocker.Auto = AutomaticNetworkMocker));
