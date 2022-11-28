export interface PaginationParameters {
  from?: string;
  limit?: number;
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
