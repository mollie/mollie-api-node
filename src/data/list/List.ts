import Maybe from '../../types/Maybe';
import Nullable from '../../types/Nullable';
import { Links, Url } from '../global';

export default interface List<T> extends Array<T> {
  links: ListLinks;
  /**
   * @deprecated Use `list.length` instead.
   */
  count: number;
  nextPageCursor: Maybe<string>;
  previousPageCursor: Maybe<string>;
  nextPage: Maybe<() => Promise<List<T>>>;
  previousPage: Maybe<() => Promise<List<T>>>;
}

export interface ListLinks extends Links {
  next: Nullable<Url>;
  previous: Nullable<Url>;
}
