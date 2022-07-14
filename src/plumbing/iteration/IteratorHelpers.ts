type Vehicle<T> = AsyncIterator<T, void, never> | AsyncIterable<T>;
type MappedVehicle<V extends Vehicle<any>, U> = V extends AsyncIterator<any, void, never> ? AsyncIterator<U> : AsyncIterable<U>;

export default interface IteratorHelpers<T, V extends Vehicle<T>> {
  /**
   * Returns an iterator of the underlying sequence after skipping the passed limit.
   *
   * @since 3.6.0
   */
  drop(limit: number): V & IteratorHelpers<T, V>;

  /**
   * Returns whether every value in the sequence satisfies the passed callback.
   *
   * @since 3.6.0
   */
  every(callback: (value: T) => boolean | Promise<boolean>): Promise<boolean>;

  /**
   * Returns an iterator of values in the sequence which satisfy the passed callback.
   *
   * @since 3.6.0
   */
  filter(callback: (value: T) => boolean | Promise<boolean>): V & IteratorHelpers<T, V>;

  /**
   * Returns the first value in the sequence which satisfies the passed callback.
   */
  find(callback: (value: T) => boolean | Promise<boolean>): Promise<T | undefined>;

  /**
   * Calls the passed callback once for every value in the sequence.
   *
   * @since 3.6.0
   */
  forEach(callback: (value: T) => any | Promise<any>): Promise<void>;

  /**
   * Returns an iterator of the values in the sequence with the passed callback applied.
   *
   * @since 3.6.0
   */
  map<U>(callback: (value: T) => U | Promise<U>): MappedVehicle<V, U> & IteratorHelpers<U, MappedVehicle<V, U>>;

  /**
   * Returns whether at least one value in the sequence satisfies the passed callback.
   *
   * @since 3.6.0
   */
  some(callback: (value: T) => boolean | Promise<boolean>): Promise<boolean>;

  /**
   * Returns an iterator of up to the passed limit of the values from the sequence.
   *
   * @since 3.6.0
   */
  take(limit: number): V & IteratorHelpers<T, V>;
}
