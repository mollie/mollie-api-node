export interface PaginationParameters {
  /**
   * Offset the result set to the resource with the given ID. The returned result set will start with the resource after the given one.
   *
   * @see https://docs.mollie.com/reference/pagination
   */
  from?: string;
  /**
   * The number of resources to return per page. Defaults to 50. Maximum 250.
   *
   * @see https://docs.mollie.com/reference/pagination
   */
  limit?: number;
}

export interface SortParameter {
  /**
   * Determines the sorting direction of the results. By default, the results are sorted in descending order (newest first).
   *
   * Possible values: `asc` `desc`
   *
   * @see https://docs.mollie.com/reference/pagination
   */
  sort?: 'asc' | 'desc';
}

export interface TestModeParameter {
  /**
   * Most API credentials are specifically created for either live mode or test mode, in which case this parameter does not need to be set.
   * For organization-level credentials such as OAuth access tokens, set this to `true` to use test mode.
   */
  testmode?: boolean;
}

export interface ThrottlingParameter {
  /**
   * The number of values the iterator will produce per minute before throttling. Note that this value is not enforced
   * strictly; it is more of a hint.
   */
  valuesPerMinute?: number;
}

export interface IdempotencyParameter {
  /**
   * The idempotency key sent to the Mollie API. The Mollie API uses this key to distinguish a single operation being
   * attempted twice from two separate similarly-looking operations. When provided, you can safety re-attempt an
   * operation without risk of said operation being performed twice. This is useful in case of network issues or your
   * server going down unexpectedly, as it is uncertain whether the operation was actually performed during the first
   * attempt in those situations.
   *
   * The Mollie API stores the response of every request made for a given idempotency key. A subsequent request with a
   * known key will cause the previously stored response to be replayed; instead of having the effect the request would
   * normally have. Note that the Mollie API will purge stored responses at some point. Re-attempts should happen
   * within an hour for this reason.
   *
   * If this property is `undefined`, a random idempotency key will be generated and used internally. This property
   * adds value only if the idempotency key is stored outside of the Mollie client.
   */
  idempotencyKey?: string;
}
