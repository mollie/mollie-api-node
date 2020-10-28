import { AxiosInstance, AxiosResponse } from 'axios';
import { parse as parseUrl } from 'url';
import { stringify as stringifyToQueryString } from 'querystring';
import ApiError from '../errors/ApiError';
import getEntries from '../plumbing/getEntries';
import List from '../data/list/List';
import Maybe from '../types/Maybe';

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

export default class Resource<R, T extends R> {
  protected readonly network: {
    post: <S extends T | true = T>(url: string, data: any, query?: Record<string, any>) => Promise<S>;
    get: (url: string, query?: Record<string, any>) => Promise<T>;
    list: (url: string, resourceName: string, query?: Record<string, any>) => Promise<Omit<List<T>, 'nextPage' | 'previousPage'>>;
    patch: (url: string, data: any) => Promise<T>;
    delete: <S extends T | true>(url: string, context?: any) => Promise<S>;
  };

  constructor(protected readonly httpClient: AxiosInstance) {
    /* eslint-disable no-var */
    this.network = {
      post: async <S extends T | true = T>(url: string, data: any, query: Record<string, any> = {}): Promise<S> => {
        try {
          var response: AxiosResponse = await httpClient.post(`${url}${stringifyQuery(query)}`, data);
        } catch (error) {
          if (error.response != undefined) {
            throw ApiError.createFromResponse(error.response);
          }
          throw new ApiError(error.message);
        }
        if (response.status == 204) {
          return true as S;
        }
        return this.injectPrototypes(response.data) as S;
      },
      get: async (url: string, query: Record<string, any> = {}): Promise<T> => {
        try {
          var response: AxiosResponse = await httpClient.get(`${url}${stringifyQuery(query)}`);
        } catch (error) {
          if (error.response != undefined) {
            throw ApiError.createFromResponse(error.response);
          }
          throw new ApiError(error.message);
        }
        return this.injectPrototypes(response.data);
      },
      list: async (url: string, resourceName: string, query: Record<string, any> = {}): Promise<Omit<List<T>, 'nextPage' | 'previousPage'>> => {
        try {
          var response: AxiosResponse = await httpClient.get(`${url}${stringifyQuery(query)}`);
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
        return Object.assign(embedded[resourceName].map(this.injectPrototypes), {
          links,
          count,
        });
      },
      patch: async (url: string, data: any): Promise<T> => {
        try {
          var response: AxiosResponse = await httpClient.patch(url, data);
        } catch (error) {
          if (error.response != undefined) {
            throw ApiError.createFromResponse(error.response);
          }
          throw new ApiError(error.message);
        }
        return this.injectPrototypes(response.data);
      },
      delete: async <S extends T | true>(url: string, context?: any): Promise<S> => {
        try {
          var response: AxiosResponse = await httpClient.delete(url, { data: context });
        } catch (error) {
          if (error.response != undefined) {
            throw ApiError.createFromResponse(error.response);
          }
          throw new ApiError(error.message);
        }
        if (response.status == 204) {
          return true as S;
        }
        return this.injectPrototypes(response.data) as S;
      },
    };
    /* eslint-enable no-var */
  }

  /**
   * Injects `nextPage`, `nextPageCursor`, `previousPage`, and `previousPageCursor` into the passed list.
   */
  protected injectPaginationHelpers<P>(
    input: Omit<List<T>, 'nextPage' | 'nextPageCursor' | 'previousPage' | 'previousPageCursor'>,
    list: (parameters: P) => Promise<List<T>>,
    selfParameters: P,
  ): List<T> {
    const { links } = input;
    let nextPage: Maybe<() => Promise<List<T>>>;
    let nextPageCursor: Maybe<string>;
    if (links.next != null) {
      const { query } = parseUrl(links.next.href, true);
      nextPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      nextPageCursor = query.from as string;
    }
    let previousPage: Maybe<() => Promise<List<T>>>;
    let previousPageCursor: Maybe<string>;
    if (links.previous != null) {
      const { query } = parseUrl(links.previous.href, true);
      previousPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      previousPageCursor = query.from as string;
    }
    return Object.assign(input, {
      nextPage,
      nextPageCursor,
      previousPage,
      previousPageCursor,
    }) as List<T>;
  }

  /**
   * Injects prototypes ‒ where necessary ‒ into the response received from the Mollie server.
   */
  protected injectPrototypes(input: R): T {
    return input as T;
  }
}
