import { Links, Url } from '../global';

export default interface List<T> extends Array<T> {
  links: ListLinks;
  count: number;
  nextPageCursor: string | undefined;
  previousPageCursor: string | undefined;
  nextPage: () => Promise<List<T>> | undefined;
  previousPage: () => Promise<List<T>> | undefined;
}

export interface ListLinks extends Links {
  next: Url | null;
  previous: Url | null;
}
