import parseQueryInUrl from '../communication/parseQueryInUrl';
import List from '../data/list/List';
import Maybe from '../types/Maybe';

/**
 * A binder is the interface for a certain type of information. There is a binder for orders, and one for customers, et
 * cetera.
 */
export default class Binder<R, T extends R> {
  /**
   * Injects `nextPage`, `nextPageCursor`, `previousPage`, and `previousPageCursor` into the passed list.
   */
  protected injectPaginationHelpers<P>(input: Array<T> & Pick<List<T>, 'count' | 'links'>, list: (parameters: P) => Promise<List<T>>, selfParameters: P = {} as P): List<T> {
    const { links } = input;
    let nextPage: Maybe<() => Promise<List<T>>>;
    let nextPageCursor: Maybe<string>;
    if (links.next != null) {
      const query = parseQueryInUrl(links.next.href);
      nextPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      nextPageCursor = query.from;
    }
    let previousPage: Maybe<() => Promise<List<T>>>;
    let previousPageCursor: Maybe<string>;
    if (links.previous != null) {
      const query = parseQueryInUrl(links.previous.href);
      previousPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      previousPageCursor = query.from;
    }
    return Object.assign(input, {
      nextPage,
      nextPageCursor,
      previousPage,
      previousPageCursor,
    }) as List<T>;
  }
}
