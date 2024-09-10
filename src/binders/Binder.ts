import breakUrl from '../communication/breakUrl';
import type Page from '../data/page/Page';
import type Maybe from '../types/Maybe';

/**
 * A binder is the interface for a certain type of information. There is a binder for orders, and one for customers, et
 * cetera.
 */
export default class Binder<R, T extends Omit<R, '_links' | '_embedded'>> {
  /**
   * Injects `nextPage`, `nextPageCursor`, `previousPage`, and `previousPageCursor` into the passed list.
   */
  protected injectPaginationHelpers<P>(input: Array<T> & Pick<Page<T>, 'links'>, list: (parameters: P) => Promise<Page<T>>, selfParameters: P = {} as P): Page<T> {
    const { links } = input;
    let nextPage: Maybe<() => Promise<Page<T>>>;
    let nextPageCursor: Maybe<string>;
    if (links.next != null) {
      const [, query] = breakUrl(links.next.href);
      nextPage = list.bind(this, {
        ...selfParameters,
        ...query,
      });
      nextPageCursor = query.from;
    }
    let previousPage: Maybe<() => Promise<Page<T>>>;
    let previousPageCursor: Maybe<string>;
    if (links.previous != null) {
      const [, query] = breakUrl(links.previous.href);
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
    }) as Page<T>;
  }
}
