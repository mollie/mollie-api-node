import List from '../data/list/List';
import { AxiosInstance, AxiosResponse } from 'axios';
import ApiError from '../errors/ApiError';
import querystring from 'qs';
import { parse as parseUrl } from 'url';

function stringifyQuery(input: Record<string, any>): string {
  return querystring.stringify(
    Object.entries(input).reduce((result, [key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.join(';');
      } /* if (Array.isArray(value) == false) */ else {
        result[key] = value;
      }
      return result;
    }, {}),
    { addQueryPrefix: true },
  );
}

export default class Resource<R, T extends R> {
  protected readonly network: {
    post: (url: string, data: any) => Promise<T>;
    get: (url: string, query?: Record<string, any>) => Promise<T>;
    list: (url: string, resourceName: string, query: Record<string, any>) => Promise<Omit<List<T>, 'nextPage' | 'previousPage'>>;
    patch: (url: string, data: any) => Promise<T>;
    delete: (url: string) => Promise<T | true>;
  };

  constructor(protected readonly httpClient: AxiosInstance) {
    this.network = {
      post: async (url: string, data: any) => {
        try {
          var response: AxiosResponse = await httpClient.post(url, data);
        } catch (error) {
          throw ApiError.captureStackTrace(error.response);
        }
        return this.injectPrototypes(response.data);
      },
      get: async (url: string, query: Record<string, any> = {}) => {
        try {
          var response: AxiosResponse = await httpClient.get(`${url}${stringifyQuery(query)}`);
        } catch (error) {
          throw ApiError.createFromResponse(error.response);
        }
        return this.injectPrototypes(response.data);
      },
      list: async (url: string, resourceName: string, query: Record<string, any>) => {
        try {
          var response: AxiosResponse = await httpClient.get(`${url}${stringifyQuery(query)}`);
        } catch (error) {
          throw ApiError.createFromResponse(error.response);
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
      patch: async (url: string, data: any) => {
        try {
          var response: AxiosResponse = await httpClient.patch(url, data);
        } catch (error) {
          throw ApiError.createFromResponse(error.response);
        }
        return this.injectPrototypes(response.data);
      },
      delete: async (url: string) => {
        try {
          var response: AxiosResponse = await httpClient.delete(url);
        } catch (error) {
          throw ApiError.captureStackTrace(error.response);
        }
        if (response.status != 204) {
          return this.injectPrototypes(response.data);
        } /* if (response.status == 204) */ else {
          return true;
        }
      },
    };
  }

  /**
   * Injects `nextPage`, `nextPageCursor`, `previousPage`, and `previousPageCursor` into the passed list.
   */
  protected injectPaginationHelpers(
    input: Omit<List<T>, 'nextPage' | 'nextPageCursor' | 'previousPage' | 'previousPageCursor'>,
    list: (parameters: Record<string, any>) => Promise<List<T>>,
    selfParameters: Record<string, any>,
  ): List<T> {
    const { links } = input;
    let nextPage: () => Promise<List<T>> | undefined;
    let nextPageCursor: string | undefined;
    if (links.next != null) {
      const { query } = parseUrl(links.next.href, true);
      nextPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      nextPageCursor = query.from as string;
    }
    let previousPage: () => Promise<List<T>> | undefined;
    let previousPageCursor: string | undefined;
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
