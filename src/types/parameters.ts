export interface PaginationParameters {
  from?: string;
  limit?: number;
}

export interface ThrottlingParameters {
  /**
   * The number of values the iterator will produce per minute before throttling. Note that this value is not enforced
   * strictly; it is more of a hint.
   */
  valuesPerMinute?: number;
}
