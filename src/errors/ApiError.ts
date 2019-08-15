import { cloneDeep, get, has } from 'lodash';
import { IMollieApiError, IMollieApiErrorLinks, IUrl } from '../types/global';

/**
 * @since 2.2.0
 */
export default class ApiError extends Error {
  protected title: string;
  protected status: number;
  protected field: string;
  protected links: IMollieApiErrorLinks;

  public constructor(message: string, title?: string, status?: number, field?: string, links?: IMollieApiErrorLinks) {
    super(message);
    this.name = 'ApiError';

    this.title = title;
    this.status = status;
    this.field = field;
    this.links = links;
  }

  /**
   * Get the error message
   *
   * @returns The error message
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Get the field name that contains an error
   *
   * @returns The error field
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getField(): string {
    return this.field;
  }

  /**
   * Get the API status code
   *
   * @returns The status code
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getStatusCode(): number {
    return this.status;
  }

  /**
   * Get the documentation URL
   *
   * @returns The documentation URL
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getDocumentationUrl(): string {
    return this.getUrl('documentation');
  }

  /**
   * Get the dashboard URL
   *
   * @returns The dashboard URL
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getDashboardUrl(): string {
    return this.getUrl('dashboard');
  }

  /**
   * Check if the link exists
   *
   * @param key - Link name
   *
   * @returns Whether the link exists
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public hasLink(key: string): boolean {
    return has(this.links, key);
  }

  /***
   * Retrieve a link by name
   *
   * @param key - The link name
   *
   * @returns A link to the resource
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getLink(key: string): IUrl {
    return get(this.links, key);
  }

  /**
   *
   * @param {string} key
   *
   * @returns {string}
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public getUrl(key: string): string {
    return get(this.getLink(key), 'href');
  }

  public toString(): string {
    return `ApiError: ${this.message}`;
  }

  /**
   * Create an `ApiError` from a raw error format
   *
   * @param error - A raw Mollie API error
   *
   * @returns A new `ApiError`
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public static createFromError(error: IMollieApiError): ApiError {
    return new ApiError(get(error, 'detail'), get(error, 'title'), get(error, 'status'), get(error, 'field'), cloneDeep(get(error, '_links')));
  }

  /**
   * Create a new Resource Not Found error
   *
   * @param resource - The resource code, e.g. `'payment'`
   * @param token - The resource token, e.g. `'tr_1234'`
   *
   * @returns A new `ApiError`
   *
   * @since 2.2.0
   *
   * @public ✓ This method is part of the public API
   */
  public static createResourceNotFoundError(resource: string, token: string): ApiError {
    return ApiError.createFromError({
      status: 404,
      title: 'Not Found',
      detail: `No ${resource} exists with token ${token}.`,
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/errors',
          type: 'text/html',
        },
      },
    });
  }
}
