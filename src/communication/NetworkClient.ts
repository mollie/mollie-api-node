import https from 'https';
import fetch, { type RequestInit } from 'node-fetch';
import { type SecureContextOptions } from 'tls';

import { run } from 'ruply';
import type Page from '../data/page/Page';
import ApiError from '../errors/ApiError';
import type Options from '../Options';
import fling from '../plumbing/fling';
import DemandingIterator from '../plumbing/iteration/DemandingIterator';
import HelpfulIterator from '../plumbing/iteration/HelpfulIterator';
import Throttler from '../plumbing/Throttler';
import type Maybe from '../types/Maybe';
import { type IdempotencyParameter } from '../types/parameters';
import breakUrl from './breakUrl';
import buildUrl, { type SearchParameters } from './buildUrl';
import dromedaryCase from './dromedaryCase';
import { idempotencyHeaderName, ResponseWithIdempotencyKey, retryingFetch } from './makeRetrying';

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
      const matches =
        // platform/version
        /^([^\/]+)\/([^\/\s]+)$/.exec(versionString) ??
        fling(() => {
          if (-1 == versionString.indexOf('/') || versionString.indexOf('/') != versionString.lastIndexOf('/')) {
            return new Error('Invalid version string. It needs to consist of a name and version separated by a forward slash, e.g. RockenbergCommerce/3.1.12');
          }
          return new Error('Invalid version string. The version may not contain any whitespace.');
        });
      const platform = dromedaryCase(matches[1]);
      const version = matches[2];
      return `${platform}/${version}`;
    }),
  ].join(' ');
}

/**
 * Throws an API error based on the passed cause.
 */
const throwApiError = run(
  /**
   * Returns whether the passed value is an object with a property with the passed name (`true`) or not (`false`).
   */
  function findProperty<K extends string>(value: unknown, name: K): value is Record<K, unknown> {
    return typeof value == 'object' && value != null && name in value;
  },
  findProperty =>
    function throwApiError(cause: unknown) {
      throw new ApiError(findProperty(cause, 'message') ? String(cause.message) : 'An unknown error has occurred');
    },
);

/**
 * Checks if an API error needs to be thrown based on the passed result.
 */
async function processFetchResponse(res: ResponseWithIdempotencyKey) {
  // Request was successful, but no content was returned.
  if (res.status == 204) return true;
  // Request was successful and content was returned.
  const body = await res.json();
  if (res.status >= 200 && res.status < 300) return body;
  // Request was not successful, but the response body contains an error message.
  if (body) throw ApiError.createFromResponse(body, res.idempotencyKey);
  // Request was not successful.
  throw new ApiError('An unknown error has occurred');
}

interface Data {}
interface Context {}

/**
 * This class is essentially a wrapper around fetch. It simplifies communication with the Mollie API over the network.
 */
export default class NetworkClient {
  protected readonly request: (pathname: string, options?: RequestInit) => Promise<ResponseWithIdempotencyKey>;
  constructor({
    apiKey,
    accessToken,
    versionStrings,
    apiEndpoint = 'https://api.mollie.com:443/v2/',
    caCertificates,
    libraryVersion,
    nodeVersion,
  }: Options & { caCertificates?: SecureContextOptions['ca']; libraryVersion: string; nodeVersion: string }) {
    // Compose the headers set in the sent requests.
    const headers: Record<string, string> = {};
    headers['User-Agent'] = composeUserAgent(nodeVersion, libraryVersion, versionStrings);
    if (apiKey != undefined) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    } /* if (accessToken != undefined) */ else {
      headers['Authorization'] = `Bearer ${accessToken}`;
      headers['User-Agent'] += ' OAuth/2.0';
    }
    headers['Accept'] = 'application/hal+json';
    headers['Accept-Encoding'] = 'gzip';
    headers['Content-Type'] = 'application/json';

    // Create the https agent.
    const agent = new https.Agent({ ca: caCertificates });

    // Create retrying fetch function.
    const fetchWithRetries = retryingFetch(fetch);

    // Create the request function.
    this.request = (pathname, options) => {
      // If the pathname starts with a slash, remove it and prepend the API endpoint.
      const url = pathname.startsWith('/') ? `${apiEndpoint}${pathname.substring(1)}` : pathname;
      return fetchWithRetries(url, { agent, ...options, headers: { ...headers, ...options?.headers } });
    };
  }

  async post<R>(pathname: string, data: Data & IdempotencyParameter, query?: SearchParameters): Promise<R | true> {
    // Take the idempotency key from the data, if any. It would be cleaner from a design perspective to have the
    // idempotency key in a separate argument instead of cramming it into the data like this. However, having a
    // separate argument would require every endpoint to split the input into those two arguments and thus cause a lot
    // of boiler-plate code.
    const { idempotencyKey, ...body } = data;
    const config: RequestInit = {
      method: 'POST',
      headers: idempotencyKey ? { [idempotencyHeaderName]: idempotencyKey } : undefined,
      body: JSON.stringify(body),
    };
    return this.request(buildUrl(pathname, query), config).catch(throwApiError).then(processFetchResponse);
  }

  async get<R>(pathname: string, query?: SearchParameters): Promise<R> {
    return this.request(buildUrl(pathname, query)).catch(throwApiError).then(processFetchResponse);
  }

  async list<R>(pathname: string, binderName: string, query?: SearchParameters): Promise<R[]> {
    const data = await this.request(buildUrl(pathname, query)).catch(throwApiError).then(processFetchResponse);
    try {
      /* eslint-disable-next-line no-var */
      var { _embedded: embedded } = data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return embedded[binderName] as R[];
  }

  async page<R>(pathname: string, binderName: string, query?: SearchParameters): Promise<R[] & Pick<Page<R>, 'links' | 'count'>> {
    const data = await this.request(buildUrl(pathname, query)).catch(throwApiError).then(processFetchResponse);
    try {
      /* eslint-disable-next-line no-var */
      var { _embedded: embedded, _links: links, count } = data;
    } catch (error) {
      throw new ApiError('Received unexpected response from the server');
    }
    return Object.assign(embedded[binderName] as R[], {
      links,
      count,
    });
  }

  iterate<R>(pathname: string, binderName: string, query: Maybe<SearchParameters>, valuesPerMinute = 5000): HelpfulIterator<R> {
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
      const { request } = this;
      return new HelpfulIterator<R>(
        (async function* iterate<R>() {
          let url = buildUrl(pathname, { ...query, limit: popLimit() });
          while (true) {
            // Request and parse the page from the Mollie API.
            const data = await request(url).catch(throwApiError).then(processFetchResponse);
            try {
              /* eslint-disable-next-line no-var */
              var { _embedded: embedded, _links: links } = data;
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

  async patch<R>(pathname: string, data: Data): Promise<R> {
    const config: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(data),
    };
    return this.request(buildUrl(pathname), config).catch(throwApiError).then(processFetchResponse);
  }

  async delete<R>(pathname: string, context?: Context & IdempotencyParameter): Promise<R | true> {
    // Take the idempotency key from the context, if any.
    const { idempotencyKey, ...body } = context ?? {};
    const config: RequestInit = {
      method: 'DELETE',
      headers: idempotencyKey ? { [idempotencyHeaderName]: idempotencyKey } : undefined,
      body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    };
    return this.request(buildUrl(pathname), config).catch(throwApiError).then(processFetchResponse);
  }
}
