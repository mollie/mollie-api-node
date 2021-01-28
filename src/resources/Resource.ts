import List from '../data/list/List';
import Maybe from '../types/Maybe';
import TransformingNetworkClient from '../TransformingNetworkClient';

/**
 * Returns the parsed search parameters from the passed URL. For example: `'https://example.com?id=5'` is converted to
 * `{ id: 5 }` (and `'https://example.com'` is converted to `{}`).
 *
 * If multiple parameters have the same key (`'https://example.com?id=5&id=6'`), exactly one of them will be
 * represented in the returned object.
 */
function parseQueryInUrl(url: string) {
  const result: Record<string, string> = {};
  return new URL(url).searchParams.forEach((value, key) => result[key] = value), result;
}
export default class Resource<R, T extends R> {
  constructor(protected readonly networkClient: TransformingNetworkClient<R, T>) {}
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
