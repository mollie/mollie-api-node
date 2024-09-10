import { type Links, type Url } from '../data/global';
import type Maybe from '../types/Maybe';

type ApiErrorLinks = Record<string, Url> & Links;
type Info = {
  field?: string;
  statusCode?: number;
  idempotencyKey?: string;
  title?: string;
  links?: ApiErrorLinks;
};

export default class ApiError extends Error {
  // Set the name to ApiError.
  public readonly name: string = 'ApiError';
  public readonly field?: string;
  public readonly statusCode?: number;
  public readonly idempotencyKey?: string;
  protected title?: string;
  protected links?: ApiErrorLinks;
  private readonly [Symbol.toStringTag] = this.name;

  public constructor(message: string, info: Info = {}) {
    super(message);
    Object.assign(this, info);
    // Ensure the message is enumerable, making it more likely to survive serialisation.
    Object.defineProperty(this, 'message', { enumerable: true });
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
    return this.links !== undefined && key in this.links;
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
  public getUrl(key: keyof ApiErrorLinks): Maybe<string> {
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
  public static createFromResponse(body: any, idempotencyKey: string | undefined): ApiError {
    const { detail, title, status: statusCode, field, _links: links } = body;
    return new ApiError(detail ?? 'Received an error without a message', { title, statusCode, field, links, idempotencyKey });
  }
}
