import Maybe from '../../types/Maybe';
import Nullable from '../../types/Nullable';
import { Links, Url } from '../global';

export default interface Page<T> extends Array<T> {
  links: PageLinks;
  /**
   * @deprecated Use `list.length` instead.
   */
  count: number;
  nextPageCursor: Maybe<string>;
  previousPageCursor: Maybe<string>;
  nextPage: Maybe<() => Promise<Page<T>>>;
  previousPage: Maybe<() => Promise<Page<T>>>;
}

export interface PageLinks extends Links {
  next: Nullable<Url>;
  previous: Nullable<Url>;
}
