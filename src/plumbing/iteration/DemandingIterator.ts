import HelpfulIterator from './HelpfulIterator';
import LazyIterator from './LazyIterator';

function getInfinity() {
  return Number.POSITIVE_INFINITY;
}

/**
 * A lazy iterator (see `LazyIterator`) which comes up with an educated guess for the amount of values which have to be
 * produced to meet the demand.
 *
 * Take this example:
 * ```
 * await […].iterate().drop(5).take(10).forEach([…]);
 * ```
 * In this scenario, this class would correctly guess that the iterator only has to produce 15 values to meet the
 * demand. The upstream iterator can take advantage of this information to avoid preparing values which will never be
 * consumed.
 *
 * Because any number of new iterators can be created from any iterator (through `drop`, `filter`, `map`, and `take`),
 * those iterators together form a (rooted) tree. The educated guess is derived from the path between the root and the
 * leaf which triggers the creation of the upstream iterator.
 *
 * This does mean that in the following example, this class incorrectly guesses that only 10 values are required when
 * in actuality 12 are required:
 * ```
 * const iterator = […].iterate();
 * await iterator.take(10).forEach([…]);
 * await iterator.take(2).forEach([…]);
 * ```
 */
export default class DemandingIterator<T> extends LazyIterator<T> {
  private path: Array<(demand: number) => number>;
  constructor(create: (demand: number) => HelpfulIterator<T>);
  constructor(create: () => HelpfulIterator<T>, path: Array<(demand: number) => number>);
  constructor(create: (demand: number) => HelpfulIterator<T>, path?: Array<(demand: number) => number>) {
    super(() => {
      // If this demanding iterator was not created by another demanding iterator (hence the absence of the path), it
      // is the root. Derive the educated guess for the demand from the path.
      var demand = Number.POSITIVE_INFINITY;
      if (path == undefined) {
        this.path.forEach(edge => (demand = edge(demand)));
      }
      return create(demand);
    });
    this.path = path ?? [];
  }

  drop(limit: number) {
    return new DemandingIterator(() => (this.path.push(demand => demand + limit), this.settle().drop(limit)), this.path);
  }

  filter(callback: (value: T) => boolean | Promise<boolean>) {
    return new DemandingIterator(() => (this.path.push(getInfinity), this.settle().filter(callback)), this.path);
  }

  map<U>(callback: (value: T) => U | Promise<U>) {
    // Since map does not affect the demand in any way, it may be omitted from the path.
    return new DemandingIterator(() => this.settle().map(callback), this.path);
  }

  take(limit: number) {
    return new DemandingIterator(() => (this.path.push(demand => Math.min(demand, limit)), this.settle().take(limit)), this.path);
  }
}
