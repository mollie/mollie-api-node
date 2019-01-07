import { parseCursorUrl } from '../utils';

/**
 * A list helper class
 */
export default class List<T> extends Array {
  links: Mollie.ILinks = null;
  count: number = null;
  nextPage: any = null;
  previousPage: any = null;
  nextPageCursor: any = null;
  previousPageCursor: any = null;

  static getNextPageParams(links: Mollie.ILinks) {
    if (links.next && links.next.href) {
      return parseCursorUrl(links.next.href).query;
    }

    return {};
  }

  static getPreviousPageParams(links: Mollie.ILinks) {
    if (links.previous && links.previous.href) {
      return parseCursorUrl(links.previous.href).query;
    }

    return {};
  }

  static buildResourceList({ response, resourceName, params, callback, getResources, Model }: any) {
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
    list.push(...resources.map((resource: any) => new Model(resource)));

    return list;
  }
}
