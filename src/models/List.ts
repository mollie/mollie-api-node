import { parse } from 'url';
import { IListLinks } from '../types/global';
import Model from '../model';
import { ResourceCallback } from '../resource';

interface IInstantiable<T = any> {
  new (...args: Array<any>): T;
}

interface IResourceListParams {
  response: {
    _embedded: any;
    _links: IListLinks;
    count: number;
  };
  resourceName: string;
  params: any;
  getResources: Function;
  Model: IInstantiable<Model>;

  // Deprecated since 2.2.0
  callback?: ResourceCallback;
}

/**
 * A list helper class
 */
export default class List<T> extends Array {
  public links: IListLinks = null;
  public count: number = null;
  public nextPage: () => Promise<List<Model>> = null;
  public previousPage: () => Promise<List<Model>> = null;
  public nextPageCursor?: string = null;
  public previousPageCursor?: string = null;

  public static getNextPageParams(links: IListLinks): any {
    if (links.next && links.next.href) {
      return parse(links.next.href, true).query;
    }

    return {};
  }

  public static getPreviousPageParams(links: IListLinks): any {
    if (links.previous && links.previous.href) {
      return parse(links.previous.href, true).query;
    }

    return {};
  }

  public static buildResourceList({ response, resourceName, params, callback, getResources, Model }: IResourceListParams): List<Model> {
    const { _embedded, count, _links } = response;
    const resources = _embedded[resourceName];
    const list = new List();
    list.links = _links;
    list.count = count;
    list.nextPage = async () =>
      getResources(
        {
          ...params,
          ...List.getNextPageParams(_links),
        },
        callback,
      );
    list.previousPage = async () =>
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
