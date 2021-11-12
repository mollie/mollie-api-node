import convertToNonNegativeInteger from './convertToNonNegativeInteger';

const iteratorSymbol = (() => {
  if ('asyncIterator' in Symbol) {
    return Symbol.asyncIterator;
  }
  // If there is no predefined symbol (Node.js < 10.0.0), use this custom one. This means the method will be
  // effectively inaccessible in old Node.js versions. That is OK, though: the iterator is still useful through the old
  // school syntax with next.
  return Symbol('asyncIterator');
})();

async function* drop<T>(wrappee: AsyncIterator<T, void, never>, remaining: number): AsyncIterator<T, void, never> {
  let next = await wrappee.next();
  while (true) {
    if (next.done) {
      return;
    }
    if (remaining != 0) {
      remaining--;
      next = await wrappee.next();
      continue;
    }
    yield next.value;
    next = await wrappee.next();
  }
}

async function* filter<T>(wrappee: AsyncIterator<T, void, never>, callback: (value: T) => boolean | Promise<boolean>): AsyncIterator<T, void, never> {
  let next = await wrappee.next();
  while (true) {
    if (next.done) {
      return;
    }
    if (await callback(next.value)) {
      yield next.value;
    }
    next = await wrappee.next();
  }
}

async function* map<T, U>(wrappee: AsyncIterator<T, void, never>, callback: (value: T) => U | Promise<U>): AsyncIterator<U, void, never> {
  let next = await wrappee.next();
  while (true) {
    if (next.done) {
      return;
    }
    yield callback(next.value);
    next = await wrappee.next();
  }
}

async function* take<T>(wrappee: AsyncIterator<T, void, never>, remaining: number): AsyncIterator<T, void, never> {
  let next = await wrappee.next();
  while (remaining != 0) {
    if (next.done) {
      return;
    }
    yield next.value;
    remaining--;
    next = await wrappee.next();
  }
}

/**
 * An `AsyncIterator` with some of the proposed helpers (see https://github.com/tc39/proposal-iterator-helpers), and
 * which is itself iterable (by returning itself). This class only implements the subset of the functionalities of the
 * async iterator and of the proposed helpers which is relevant to this library.
 *
 * If and when the aforementioned helpers are supported by Node.js, this class is mostly obsolete (besides the iterable
 * part).
 */
export default class HelpfulIterator<T> implements AsyncIterator<T, void, never> {
  public readonly next: () => Promise<IteratorResult<T, void>>;
  constructor(wrappee: { next: () => Promise<IteratorResult<T, void>> }) {
    this.next = wrappee.next.bind(wrappee);
  }

  [iteratorSymbol]() {
    return this;
  }

  /**
   * Returns an iterator of the underlying sequence after skipping the passed limit.
   *
   * @since 3.6.0
   */
  drop(limit: number) {
    return new HelpfulIterator(drop(this, convertToNonNegativeInteger(limit)));
  }

  /**
   * Returns whether every value in the sequence satisfies the passed callback.
   *
   * @since 3.6.0
   */
  async every(callback: (value: T) => boolean | Promise<boolean>) {
    let next = await this.next();
    while (true) {
      if (next.done) {
        return true;
      }
      if ((await callback(next.value)) == false) {
        return false;
      }
      next = await this.next();
    }
  }

  /**
   * Returns an iterator of values in the sequence which satisfy the passed callback.
   *
   * @since 3.6.0
   */
  filter(callback: (value: T) => boolean | Promise<boolean>) {
    return new HelpfulIterator(filter(this, callback));
  }

  /**
   * Returns the first value in the sequence which satisfies the passed callback.
   */
  async find(callback: (value: T) => boolean | Promise<boolean>) {
    let next = await this.next();
    while (true) {
      if (next.done) {
        return;
      }
      if (await callback(next.value)) {
        return next.value;
      }
      next = await this.next();
    }
  }

  /**
   * Calls the passed callback once for every value in the sequence.
   *
   * @since 3.6.0
   */
  async forEach(callback: (value: T) => any | Promise<any>) {
    let next = await this.next();
    while (true) {
      if (next.done) {
        return;
      }
      await callback(next.value);
      next = await this.next();
    }
  }

  /**
   * Returns an iterator of the values in the sequence with the passed callback applied.
   *
   * @since 3.6.0
   */
  map<U>(callback: (value: T) => U | Promise<U>) {
    return new HelpfulIterator(map(this, callback));
  }

  /**
   * Returns whether at least one value in the sequence satisfies the passed callback.
   *
   * @since 3.6.0
   */
  async some(callback: (value: T) => boolean | Promise<boolean>) {
    let next = await this.next();
    while (true) {
      if (next.done) {
        return false;
      }
      if (await callback(next.value)) {
        return true;
      }
      next = await this.next();
    }
  }

  /**
   * Returns an iterator of up to the passed limit of the values from the sequence.
   *
   * @since 3.6.0
   */
  take(limit: number) {
    return new HelpfulIterator(take(this, convertToNonNegativeInteger(limit)));
  }
}
