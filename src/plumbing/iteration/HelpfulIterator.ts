import type IteratorHelpers from './IteratorHelpers';
import convertToNonNegativeInteger from '../convertToNonNegativeInteger';

async function* drop<T>(wrappee: AsyncIterator<T, void, never>, remaining: number): AsyncIterator<T, void, never> {
  let next: IteratorResult<T, void>;
  while (true) {
    next = await wrappee.next();
    if (next.done) {
      return;
    }
    if (remaining != 0) {
      remaining--;
      continue;
    }
    yield next.value;
  }
}

async function* filter<T>(wrappee: AsyncIterator<T, void, never>, callback: (value: T) => boolean | Promise<boolean>): AsyncIterator<T, void, never> {
  let next: IteratorResult<T, void>;
  while (true) {
    next = await wrappee.next();
    if (next.done) {
      return;
    }
    if (await callback(next.value)) {
      yield next.value;
    }
  }
}

async function* map<T, U>(wrappee: AsyncIterator<T, void, never>, callback: (value: T) => U | Promise<U>): AsyncIterator<U, void, never> {
  let next: IteratorResult<T, void>;
  while (true) {
    next = await wrappee.next();
    if (next.done) {
      return;
    }
    yield callback(next.value);
  }
}

async function* take<T>(wrappee: AsyncIterator<T, void, never>, remaining: number): AsyncIterator<T, void, never> {
  let next: IteratorResult<T, void>;
  while (remaining != 0) {
    next = await wrappee.next();
    if (next.done) {
      return;
    }
    yield next.value;
    remaining--;
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
export default class HelpfulIterator<T> implements AsyncIterator<T, void, never>, IteratorHelpers<T, AsyncIterator<T, void, never>>, AsyncIterable<T> {
  public readonly next: () => Promise<IteratorResult<T, void>>;
  constructor(wrappee: { next: () => Promise<IteratorResult<T, void>> }) {
    this.next = wrappee.next.bind(wrappee);
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  drop(limit: number) {
    return new HelpfulIterator(drop(this, convertToNonNegativeInteger(limit)));
  }

  async every(callback: (value: T) => boolean | Promise<boolean>) {
    let next: IteratorResult<T, void>;
    while (true) {
      next = await this.next();
      if (next.done) {
        return true;
      }
      if ((await callback(next.value)) == false) {
        return false;
      }
    }
  }

  filter(callback: (value: T) => boolean | Promise<boolean>) {
    return new HelpfulIterator(filter(this, callback));
  }

  async find(callback: (value: T) => boolean | Promise<boolean>) {
    let next: IteratorResult<T, void>;
    while (true) {
      next = await this.next();
      if (next.done) {
        return;
      }
      if (await callback(next.value)) {
        return next.value;
      }
    }
  }

  async forEach(callback: (value: T) => any | Promise<any>) {
    let next: IteratorResult<T, void>;
    while (true) {
      next = await this.next();
      if (next.done) {
        return;
      }
      await callback(next.value);
    }
  }

  map<U>(callback: (value: T) => U | Promise<U>) {
    return new HelpfulIterator(map(this, callback));
  }

  async some(callback: (value: T) => boolean | Promise<boolean>) {
    let next: IteratorResult<T, void>;
    while (true) {
      next = await this.next();
      if (next.done) {
        return false;
      }
      if (await callback(next.value)) {
        return true;
      }
    }
  }

  take(limit: number) {
    return new HelpfulIterator(take(this, convertToNonNegativeInteger(limit)));
  }
}
