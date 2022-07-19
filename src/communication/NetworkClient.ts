import https from 'https';
import { SecureContextOptions } from 'tls';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

import List from '../data/list/List';
import ApiError from '../errors/ApiError';
import Options from '../Options';
import DemandingIterator from '../plumbing/iteration/DemandingIterator';
import HelpfulIterator from '../plumbing/iteration/HelpfulIterator';
import Throttler from '../plumbing/Throttler';
import Maybe from '../types/Maybe';
import buildUrl, { SearchParameters } from './buildUrl';
import breakUrl from './breakUrl';
import dromedaryCase from './dromedaryCase';

/**
 * Like `[].map` but with support for non-array inputs, in which case this function behaves as if an array was passed
 * with the input as its sole element.
 */
function map<T, U>(input: Maybe<T | T[]>, callback: (value: T, index: number) => U, context?: any): U[] {
  if (Array.isArray(input)) {
    return input.map(callback, context);
  }
  if (input != undefined) {
    return [callback.call(context, input, 0)];
  }
  return [];
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
      const platform = dromedaryCase(matches[1]);
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
    if (findProperty(cause, 'response') && cause.response != undefined) {
      throw ApiError.createFromResponse(cause.response as AxiosResponse<any>);
    }
    throw new ApiError(findProperty(cause, 'message') ? String(cause.message) : 'An unknown error has occurred');
  };
})();

/**
 * This class is essentially a wrapper around axios. It simplifies communication with the Mollie API over the network.
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

  async post<R>(pathname: string, data: any, query?: SearchParameters): Promise<R | true> {
    const response = await this.axiosInstance.post(buildUrl(pathname, query), data).catch(throwApiError);
    if (response.status == 204) {
      return true;
    }
    return response.data;
  }

  async get<R>(pathname: string, query?: SearchParameters): Promise<R> {
    const response = await this.axiosInstance.get(buildUrl(pathname, query)).catch(throwApiError);
    return response.data;
  }

  async list<R>(pathname: string, binderName: string, query?: SearchParameters): Promise<R[] & Pick<List<R>, 'links' | 'count'>> {
    const response = await this.axiosInstance.get(buildUrl(pathname, query)).catch(throwApiError);
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

  async listPlain<R>(pathname: string, binderName: string, query?: SearchParameters): Promise<R[]> {
    const response = await this.axiosInstance.get(buildUrl(pathname, query)).catch(throwApiError);
    try {
      /* eslint-disable-next-line no-var */
      var { _embedded: embedded } = response.data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return embedded[binderName] as R[];
  }

  iterate<R>(pathname: string, binderName: string, query: Maybe<SearchParameters>, valuesPerMinute = 500): HelpfulIterator<R> {
    return new DemandingIterator(demand => {
      // Pick the page sizes (limits) based on the guessed demand.
      let popLimit: () => number;
      // If no demand was guessed, pages of 128 values each will be requested.
      if (demand == Number.POSITIVE_INFINITY) {
        popLimit = () => 128;
      } /* if (demand != Number.POSITIVE_INFINITY) */ else {
        let pageSizes: number[];
        // If a demand of 64 or less was guessed, request an initial page of 64 values. This ensures inaccurate guesses
        // do not result in wastefully short pages.
        if (demand <= 64) {
          pageSizes = [64];
        } /* if (demand > 64 && demand != Number.POSITIVE_INFINITY) */ else {
          // If a demand of over 64 was guessed, request pages of 250 values ‒ a limit imposed by the Mollie API ‒
          // until the remaining demand can be met with a single page. Finally, request that single page.
          pageSizes = new Array(Math.ceil(demand / 250));
          pageSizes[0] = demand - (pageSizes.length - 1) * 250;
          pageSizes.fill(250, 1);
        }
        // If more values are requested after the guessed demand (the guess was inaccurate), request pages of 128
        // values each.
        popLimit = () => pageSizes.pop() ?? 128;
      }
      // Set up the throttler. The iterator will wait before making a request to the Mollie API if more values have
      // been consumed than "allowed" by the valuesPerMinute argument. Note that this iterator will not interrupt the
      // yielding of values which have already been received from the Mollie API. If a page of 250 values is received
      // and valuesPerMinute is set to 100, all 250 values received values will be yielded before the (two-minute)
      // break.
      const throttler = new Throttler(valuesPerMinute);
      const { axiosInstance } = this;
      return new HelpfulIterator<R>(
        (async function* iterate<R>() {
          let url = buildUrl(pathname, { ...query, limit: popLimit() });
          while (true) {
            // Request and parse the page from the Mollie API.
            const response = await axiosInstance.get(url).catch(throwApiError);
            try {
              /* eslint-disable-next-line no-var */
              var { _embedded: embedded, _links: links } = response.data;
            } catch (error) {
              throw new ApiError('Received unexpected response from the server');
            }
            // Yield the values on the page.
            const values = embedded[binderName] as R[];
            yield* values;
            // Inform the throttler of the yielded values.
            throttler.tally(values.length);
            // If the end of the sequence was reached ‒ in other words: this was the last page ‒ break out of the loop.
            if (links.next == null) {
              break;
            }
            // Build a URL from the "next" link in the response.
            const [pathname, query] = breakUrl(links.next.href);
            url = buildUrl(pathname, { ...query, limit: popLimit() });
            // Apply throttling.
            await throttler.throttle();
          }
        })(),
      );
    });
  }

  async patch<R>(pathname: string, data: any): Promise<R> {
    const response = await this.axiosInstance.patch(pathname, data).catch(throwApiError);
    return response.data;
  }

  async delete<R>(pathname: string, context?: any): Promise<R | true> {
    const response = await this.axiosInstance.delete(pathname, { data: context }).catch(throwApiError);
    if (response.status == 204) {
      return true;
    }
    return response.data as R;
  }
}
