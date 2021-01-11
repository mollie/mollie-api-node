import { parse as parseUrl } from 'url';
import List from '../data/list/List';
import Maybe from '../types/Maybe';
import TransformingNetworkClient from '../TransformingNetworkClient';

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
      const { query } = parseUrl(links.next.href, true);
      nextPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      nextPageCursor = query.from as string;
    }
    let previousPage: Maybe<() => Promise<List<T>>>;
    let previousPageCursor: Maybe<string>;
    if (links.previous != null) {
      const { query } = parseUrl(links.previous.href, true);
      previousPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      previousPageCursor = query.from as string;
    }
    return Object.assign(input, {
      nextPage,
      nextPageCursor,
      previousPage,
      previousPageCursor,
    }) as List<T>;
  }
}
