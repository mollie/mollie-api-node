import { parseCursorUrl } from './../utils';

/**
 * A list helper class
 */
export default class List extends Array {
  constructor() {
    super();
    this.links = null;
    this.count = null;
    this.nextPage = null;
    this.previousPage = null;
    this.nextPageCursor = null;
    this.previousPageCursor = null;
  }

  static getNextPageParams(links) {
    if (links.next && links.next.href) {
      return parseCursorUrl(links.next.href).query;
    }

    return {};
  }

  static getPreviousPageParams(links) {
    if (links.previous && links.previous.href) {
      return parseCursorUrl(links.previous.href).query;
    }

    return {};
  }

  static buildResourceList({
    response,
    resourceName,
    params,
    callback,
    getResources,
    Model,
  }) {
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
    list.push(...resources.map(resource => new Model(resource)));

    return list;
  }
}
