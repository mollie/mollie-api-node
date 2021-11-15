import { AxiosResponse } from 'axios';
import { cloneDeep, get, has } from 'lodash';

import { MollieApiErrorLinks, Url } from '../data/global';
import Maybe from '../types/Maybe';

export default class ApiError extends Error {
  public constructor(message: string, protected title?: string, public readonly statusCode?: number, public readonly field?: string, protected links?: MollieApiErrorLinks) {
    super(message);
    // Set the name to ApiError.
    this.name = 'ApiError';
    // Ensure the message is enumerable, making it more likely to survive serialisation.
    Object.defineProperty(this, 'message', { enumerable: true });
  }

  /**
   * Get the error message
   *
   * @since 3.0.0
   * @deprecated Use `error.message` instead.
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Get the field name that contains an error
   *
   * @since 3.0.0
   * @deprecated Use `error.field` instead.
   */
  public getField(): Maybe<string> {
    return this.field;
  }

  /**
   * Get the API status code
   *
   * @since 3.0.0
   * @deprecated Use `error.statusCode` instead.
   */
  public getStatusCode(): Maybe<number> {
    return this.statusCode;
  }

  /**
   * Get the documentation URL
   *
   * @since 3.0.0
   */
  public getDocumentationUrl(): Maybe<string> {
    return this.getUrl('documentation');
  }

  /**
   * Get the dashboard URL
   *
   * @since 3.0.0
   */
  public getDashboardUrl(): Maybe<string> {
    return this.getUrl('dashboard');
  }

  /**
   * Check if the link exists
   *
   * @since 3.0.0
   */
  public hasLink(key: string): boolean {
    return has(this.links, key);
  }

  /**
   * Retrieve a link by name
   *
   * @since 3.0.0
   */
  public getLink(key: string): Maybe<Url> {
    return this.links?.[key];
  }

  /**
   * @since 3.0.0
   */
  public getUrl(key: keyof MollieApiErrorLinks): Maybe<string> {
    return this.links?.[key]?.href;
  }

  public toString(): string {
    return `ApiError: ${this.message}`;
  }

  /**
   * Creates and returns an `ApiError` from the passed response.
   *
   * @since 3.0.0
   */
  public static createFromResponse(response: AxiosResponse): ApiError {
    return new ApiError(
      get(response, 'data.detail', 'Received an error without a message'),
      get(response, 'data.title'),
      get(response, 'data.status'),
      get(response, 'data.field'),
      cloneDeep(get(response, 'data._links')),
    );
  }
}
