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
 * Converts `{ id: 5 }` to `'?id=5'`.
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
    axiosOptions.headers['Accept'] = 'application/json';
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
  /* eslint-disable no-var */
  async post<R>(url: string, data: any, query: Record<string, any> = {}): Promise<R | true> {
    try {
      var response: AxiosResponse = await this.axiosInstance.post(`${url}${stringifyQuery(query)}`, data);
    } catch (error) {
      if (error.response != undefined) {
        throw ApiError.createFromResponse(error.response);
      }
      throw new ApiError(error.message);
    }
    if (response.status == 204) {
      return true;
    }
    return response.data;
  }
  async get<R>(url: string, query: Record<string, any> = {}): Promise<R> {
    try {
      var response: AxiosResponse = await this.axiosInstance.get(`${url}${stringifyQuery(query)}`);
    } catch (error) {
      if (error.response != undefined) {
        throw ApiError.createFromResponse(error.response);
      }
      throw new ApiError(error.message);
    }
    return response.data;
  }
  async list<R>(url: string, resourceName: string, query: Record<string, any> = {}): Promise<Array<R> & Pick<List<R>, 'links' | 'count'>> {
    try {
      var response: AxiosResponse = await this.axiosInstance.get(`${url}${stringifyQuery(query)}`);
    } catch (error) {
      if (error.response != undefined) {
        throw ApiError.createFromResponse(error.response);
      }
      throw new ApiError(error.message);
    }
    try {
      var { _embedded: embedded, _links: links, count } = response.data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return Object.assign(Array.from<R>(embedded[resourceName]), {
      links,
      count,
    });
  }
  async patch<R>(url: string, data: any): Promise<R> {
    try {
      var response: AxiosResponse = await this.axiosInstance.patch(url, data);
    } catch (error) {
      if (error.response != undefined) {
        throw ApiError.createFromResponse(error.response);
      }
      throw new ApiError(error.message);
    }
    return response.data;
  }
  async delete<R>(url: string, context?: any): Promise<R | true> {
    try {
      var response: AxiosResponse = await this.axiosInstance.delete(url, { data: context });
    } catch (error) {
      if (error.response != undefined) {
        throw ApiError.createFromResponse(error.response);
      }
      throw new ApiError(error.message);
    }
    if (response.status == 204) {
      return true;
    }
    return response.data as R;
  }
  /* eslint-enable no-var */
}
