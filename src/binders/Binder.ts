// If support for Node.js < 10.0.0 is ever dropped, this import can be removed.
import { URL } from 'url';

import List from '../data/list/List';
import buildFromEntries from '../plumbing/buildFromEntries';
import Maybe from '../types/Maybe';

/**
 * Returns the parsed search parameters from the passed URL. For example: `'https://example.com?id=5'` is converted to
 * `{ id: 5 }` (and `'https://example.com'` is converted to `{}`).
 *
 * If multiple parameters have the same key (`'https://example.com?id=5&id=6'`), exactly one of them will be
 * represented in the returned object.
 */
function parseQueryInUrl(url: string) {
  return buildFromEntries(new URL(url).searchParams);
}
/**
 * A binder is the interface for a certain type of information. There is a binder for orders, and one for customers, et
 * cetera.
 */
export default class Binder<R, T extends R> {
  /**
   * Injects `nextPage`, `nextPageCursor`, `previousPage`, and `previousPageCursor` into the passed list.
   */
  protected injectPaginationHelpers<P>(input: Array<T> & Pick<List<T>, 'count' | 'links'>, list: (parameters: P) => Promise<List<T>>, selfParameters: P): List<T> {
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
