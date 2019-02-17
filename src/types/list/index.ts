import { IListLinks } from '@mollie-types/global';
import Model from '@root/model';

export interface IList<T> extends Array<T> {
  getNextPageParams(links: IListLinks): any;
  getPreviousPageParams(links: IListLinks): any;
  links: IListLinks;
  count: number;
  nextPage: () => Promise<IList<Model>>;
  previousPage: () => Promise<IList<Model>>;
  nextPageCursor?: string;
  previousPageCursor?: string;
}
