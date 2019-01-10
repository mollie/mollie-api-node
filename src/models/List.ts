import { parseCursorUrl } from '../utils';
import { IListLinks } from '../types/global';
import Model from '../model';

/**
 * A list helper class
 */
export default class List<T> extends Array {
  public links: IListLinks = null;
  public count: number = null;
  public nextPage: Function = null;
  public previousPage: Function = null;
  public nextPageCursor: any = null;
  public previousPageCursor: any = null;

  public static getNextPageParams(links: IListLinks) {
    if (links.next && links.next.href) {
      return parseCursorUrl(links.next.href).query;
    }

    return {};
  }

  public static getPreviousPageParams(links: IListLinks) {
    if (links.previous && links.previous.href) {
      return parseCursorUrl(links.previous.href).query;
    }

    return {};
  }

  public static buildResourceList({ response, resourceName, params, callback, getResources, Model }: any) {
    const { _embedded, count = 0, _links = [] } = response;
    const resources = _embedded[resourceName];
    const list = new List();
    list.links = _links;
    list.count = count;
    list.nextPage = () =>
      getResources(
        {
          ...params,
          ...List.getNextPageParams(_links),
        },
        callback,
      );
    list.previousPage = () =>
      getResources(
        {
          ...params,
          ...List.getPreviousPageParams(_links),
        },
        callback,
      );
    list.nextPageCursor = List.getNextPageParams(_links).from;
    list.previousPageCursor = List.getPreviousPageParams(_links).from;
    list.push(...resources.map((resource: Model) => new Model(resource)));

    return list;
  }
}
