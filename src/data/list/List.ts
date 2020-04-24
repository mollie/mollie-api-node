import { Links, Url } from '../global';
import Maybe from '../../types/Maybe';
import Nullable from '../../types/Nullable';

export default interface List<T> extends Array<T> {
  links: ListLinks;
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
