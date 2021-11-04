import axios, { AxiosInstance, AxiosResponse } from 'axios';
import https from 'https';
import { SecureContextOptions } from 'tls';
import { stringify as stringifyToQueryString } from 'querystring';
import ApiError from './errors/ApiError';
import List from './data/list/List';
import Maybe from './types/Maybe';
import Options from './Options';
import getEntries from './plumbing/getEntries';

/**
 * Like `[].map` but with support for non-array inputs, in which case this function behaves as if an array was passed
 * with the input as its sole element.
 */
function map<T, U>(input: Maybe<T | T[]>, callback: (value: T, index: number) => U, context?: any): U[] {
  if (Array.isArray(input)) {
    return input.map(callback, context);
  }
  if (undefined != input) {
    return [callback.call(context, input, 0)];
  }
  return [];
}

/**
 * Converts `'rockenberg commerce'` to `'rockenbergCommerce'`.
 */
const camelCase = (() => {
  // (Converts any character after a word boundary to upper case, except for the first character in the string.)
  const firstIteration = [/(?!^)\b\w/g, (character: string) => character.toUpperCase()] as const;
  // (Removes all whitespace.)
  const secondIteration = [/\s+/g, ''] as const;
  return function camelCase(input: string) {
    return input.replace(...firstIteration).replace(...secondIteration);
  };
})();

/**
 * Returns a stringified version of the passed query to be used as the search portion of a URL. For example:
 * `{ id: 5 }` is converted to `'?id=5'` (and `{}` is converted to `''`).
 */
function stringifyQuery(input: Record<string, any>): string {
  const entries = getEntries(input);
  if (entries.length == 0) {
    return '';
  }
  return `?${stringifyToQueryString(
    entries.reduce<Record<string, any>>((result, [key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.join();
      } else if (/* Array.isArray(value) == false && */ typeof value == 'object') {
        getEntries(value).forEach(([innerKey, innerValue]) => (result[`${key}[${innerKey}]`] = innerValue));
      } /* if (typeof value != 'object') */ else {
        result[key] = value;
      }
      return result;
    }, {}),
  )}`;
}

/**
 * Composes a `User-Agent` header value which looks something like
 * `'Node/10.0.0 Mollie/3.0.0 RockenbergCommerce/1.16.0'`.
 */
function composeUserAgent(nodeVersion: string, libraryVersion: string, versionStrings: Options['versionStrings']) {
  return [
    `Node/${nodeVersion}`,
    `Mollie/${libraryVersion}`,
    ...map(versionStrings, versionString => {
      //                platform /version
      const matches = /^([^\/]+)\/([^\/\s]+)$/.exec(versionString);
      if (matches == null) {
        if (-1 == versionString.indexOf('/') || versionString.indexOf('/') != versionString.lastIndexOf('/')) {
          throw new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. RockenbergCommerce/3.1.12');
        }
        throw new Error('Invalid version string. The version may not contain any whitespace.');
      }
      const platform = camelCase(matches[1]);
      const version = matches[2];
      return `${platform}/${version}`;
    }),
  ].join(' ');
}

/**
 * Throws an API error based on the passed cause.
 */
const throwApiError = (() => {
  /**
   * Returns whether the passed value is an object with a property with the passed name (`true`) or not (`false`).
   */
  function findProperty<K extends string>(value: unknown, name: K): value is Record<K, unknown> {
    return typeof value == 'object' && value != null && name in value;
  }
  return function throwApiError(cause: unknown) {
    if (findProperty(cause, 'response')) {
      throw ApiError.createFromResponse(cause.response as AxiosResponse<any>);
    }
    throw new ApiError(findProperty(cause, 'message') ? (cause.message as string) : 'An unknown error has occurred');
  };
})();

/**
 * This class is essentially a wrapper around axios. It simplifies communication with the Mollie server over the
 * network.
 */
export default class NetworkClient {
  protected readonly axiosInstance: AxiosInstance;
  constructor({
    apiKey,
    accessToken,
    versionStrings,
    apiEndpoint = 'https://api.mollie.com:443/v2/',
    caCertificates,
    libraryVersion,
    nodeVersion,
    ...axiosOptions
  }: Options & { caCertificates?: SecureContextOptions['ca']; libraryVersion: string; nodeVersion: string }) {
    axiosOptions.headers = { ...axiosOptions.headers };
    // Compose the headers set in the sent requests.
    axiosOptions.headers['User-Agent'] = composeUserAgent(nodeVersion, libraryVersion, versionStrings);
    if (apiKey != undefined) {
      axiosOptions.headers['Authorization'] = `Bearer ${apiKey}`;
    } /* if (accessToken != undefined) */ else {
      axiosOptions.headers['Authorization'] = `Bearer ${accessToken}`;
      axiosOptions.headers['User-Agent'] += ' OAuth/2.0';
    }
    axiosOptions.headers['Accept'] = 'application/hal+json';
    axiosOptions.headers['Accept-Encoding'] = 'gzip';
    axiosOptions.headers['Content-Type'] = 'application/json';
    // Create the axios instance.
    this.axiosInstance = axios.create({
      ...axiosOptions,
      baseURL: apiEndpoint,
      httpsAgent: new https.Agent({
        ca: caCertificates,
      }),
    });
  }

  async post<R>(relativePath: string, data: any, query: Record<string, any> = {}): Promise<R | true> {
    const response = await this.axiosInstance.post(`${relativePath}${stringifyQuery(query)}`, data).catch(throwApiError);
    if (response.status == 204) {
      return true;
    }
    return response.data;
  }

  async get<R>(relativePath: string, query: Record<string, any> = {}): Promise<R> {
    const response = await this.axiosInstance.get(`${relativePath}${stringifyQuery(query)}`).catch(throwApiError);
    return response.data;
  }

  async list<R>(relativePath: string, binderName: string, query: Record<string, any> = {}): Promise<Array<R> & Pick<List<R>, 'links' | 'count'>> {
    const response = await this.axiosInstance.get(`${relativePath}${stringifyQuery(query)}`).catch(throwApiError);
    try {
      /* eslint-disable-next-line no-var */
      var { _embedded: embedded, _links: links, count } = response.data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return Object.assign(embedded[binderName] as R[], {
      links,
      count,
    });
  }

  async listPlain<R>(relativePath: string, binderName: string, query: Record<string, any> = {}): Promise<Array<R>> {
    const response = await this.axiosInstance.get(`${relativePath}${stringifyQuery(query)}`).catch(throwApiError);
    try {
      /* eslint-disable-next-line no-var */
      var { _embedded: embedded } = response.data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return embedded[binderName] as R[];
  }

  async patch<R>(relativePath: string, data: any): Promise<R> {
    const response = await this.axiosInstance.patch(relativePath, data).catch(throwApiError);
    return response.data;
  }

  async delete<R>(relativePath: string, context?: any): Promise<R | true> {
    const response = await this.axiosInstance.delete(relativePath, { data: context }).catch(throwApiError);
    if (response.status == 204) {
      return true;
    }
    return response.data as R;
  }
}
