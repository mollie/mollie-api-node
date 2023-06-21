import { apply } from 'ruply';
import type HelpfulIterator from './HelpfulIterator';

/**
 * An iterator which creates an upstream iterator using the factory function passed to the constructor, but only once
 * it is needed (when `next` is called, either directly or indirectly).
 */
export default class LazyIterator<T> implements HelpfulIterator<T> {
  /**
   * Returns the upstream iterator, creating said iterator if that had not happened yet (in other words: if this is the
   * first time this function is called).
   */
  protected settle: () => HelpfulIterator<T>;
  constructor(create: () => HelpfulIterator<T>) {
    this.settle = () =>
      apply(
        create(),
        // (The next time settle is called, return the just-created iterator.)
        iterator => (this.settle = () => iterator),
      );
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  next() {
    return this.settle().next();
  }

  drop(limit: number) {
    return new LazyIterator(() => this.settle().drop(limit));
  }

  every(callback: (value: T) => boolean | Promise<boolean>) {
    return this.settle().every(callback);
  }

  filter(callback: (value: T) => boolean | Promise<boolean>) {
    return new LazyIterator(() => this.settle().filter(callback));
  }

  find(callback: (value: T) => boolean | Promise<boolean>) {
    return this.settle().find(callback);
  }

  forEach(callback: (value: T) => any) {
    return this.settle().forEach(callback);
  }

  map<U>(callback: (value: T) => U | Promise<U>) {
    return new LazyIterator(() => this.settle().map(callback));
  }

  some(callback: (value: T) => boolean | Promise<boolean>) {
    return this.settle().some(callback);
  }

  take(limit: number): HelpfulIterator<T> {
    return new LazyIterator(() => this.settle().take(limit));
  }
}
