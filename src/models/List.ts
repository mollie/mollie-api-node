import { parse } from 'url';
import { get } from 'lodash';

import Model from '../model';
import { ResourceCallback } from '../resource';
import { IListLinks } from '../types/global';

interface IInstantiable<T = any> {
  new (...args: any[]): T;
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
    const href = get(links, 'next.href');
    if (href != undefined) {
      return parse(href, true).query;
    }
    return {};
  }

  public static getPreviousPageParams(links: IListLinks): any {
    const href = get(links, 'previous.href');
    if (href != undefined) {
      return parse(href, true).query;
    }
    return {};
  }

  public static buildResourceList({ response, resourceName, params, callback, getResources, Model }: IResourceListParams): List<Model> {
    const { _embedded, count, _links } = response;
    const resources = _embedded[resourceName];
    const list = new List();
    list.links = _links;
    list.count = count;
    list.nextPage = async (): Promise<List<Model>> =>
      getResources(
        {
          ...params,
          ...List.getNextPageParams(_links),
        },
        callback,
      );
    list.previousPage = async (): Promise<List<Model>> =>
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
