/* eslint-disable new-cap */
import qs from 'qs';
import { AxiosInstance, AxiosResponse } from 'axios';
import { cloneDeep, isPlainObject } from 'lodash';

import Model from './model';
import List from './models/List';
import ApiError from './errors/ApiError';

/**
 * @deprecated since 3.0.0
 */
export type ResourceCallback = (error: any, resource: any) => void;

export interface IParentParams {
  resource: string;
  id: string;
}

/**
 * The base resource
 */
export default class Resource {
  /**
   * Resource code such as `payments`
   * @var {string} resource
   */
  public static resource: string;

  /**
   * Refers to a Model class
   * @var {Model} model
   */
  public static model: any;

  /**
   * @var {string} apiName
   */
  public readonly apiName: string;

  /**
   * @var {string} resourcePrefix
   */
  public readonly resourcePrefix: string;

  /**
   * @var {AxiosInstance} httpClient
   */
  protected readonly httpClient: AxiosInstance;

  /**
   * @var {string} parentId
   */
  protected parentId: string;

  /**
   * Constructor
   */
  public constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  /**
   * Creates an API error, based on the passed response.
   *
   * This method throws an error if the passed callback is falsy. It calls the passed callback providing the error
   * otherwise, and then throws the error nevertheless.
   *
   * In other words, this method calls the passed callback ‒ if any ‒ providing the error it creates, and then (always)
   * throws said error.
   */
  protected static createApiError(response: AxiosResponse, cb?: Function): never;
  /**
   * Creates an API error with the passed message.
   *
   * This method throws an error if the passed callback is falsy. It calls the passed callback providing the error
   * otherwise, and then throws the error nevertheless.
   *
   * In other words, this method calls the passed callback ‒ if any ‒ providing the error it creates, and then (always)
   * throws said error.
   */
  protected static createApiError(message: string, cb?: Function): never;
  protected static createApiError(responseOrMessage: AxiosResponse | string, cb?: Function): never {
    // This method is essentially a thin wrapper around either the ApiError constructor or ApiError.createFromResponse.
    // When we implement a more generic solution for the callbacks, I think this method becomes obsolete.

    let error: ApiError;

    if (typeof responseOrMessage == 'string') {
      error = new ApiError(responseOrMessage);
    } else {
      // if (typeof responseOrMessage == 'object')
      error = ApiError.createFromResponse(responseOrMessage.data);
    }

    if (cb) {
      cb(error);
    }

    throw error;
  }

  /**
   * Set the parent ID by providing the parent
   *
   * @since 1.1.1
   *
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public withParent(parent: IParentParams): this {
    if (parent && parent.id) {
      this.setParentId(parent.id);
    }
    return this;
  }

  /**
   * Create a resource by ID
   *
   * @params params - Resource-specific parameters
   * @params cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned Promise
   *
   * @returns The resource
   *
   * @since 1.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public async create(prms: any, cb?: ResourceCallback): Promise<Model> {
    const params = cloneDeep(prms);
    const callback = typeof params === 'function' ? params : cb;
    const query: any = {};
    if (isPlainObject(params)) {
      if (typeof params.include === 'string' || Array.isArray(params.include)) {
        query.include = Array.isArray(params.include) ? params.include.join(';') : params.include;
        delete params.include;
      }
      if (typeof params.embed === 'string' || Array.isArray(params.embed)) {
        query.embed = Array.isArray(params.embed) ? params.embed.join(';') : params.embed;
        delete params.embed;
      }
    }

    try {
      const response: AxiosResponse = await this.getClient().post(`${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`, params);

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      // TODO If the passed callback throws an error, it will actually be caught here. This is probably not what we
      // want (especially since it will probably not have a response property).
      if (callback) {
        return callback(null, model);
      }
      return model;
    } catch (error) {
      Resource.createApiError(error.response, callback);
    }
  }

  /**
   * Get a resource by ID
   *
   * @params id - Resource ID
   * @params params - Resource-specific parameters
   * @params cb - (DEPRECATED SINCE 3.0.0) Optional callback function
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async get(id: string, prms?: any, cb?: ResourceCallback): Promise<Model> {
    const params = cloneDeep(prms);
    const callback = typeof params === 'function' ? params : cb;
    const query: any = {};
    if (isPlainObject(params)) {
      if (typeof params.include === 'string' || Array.isArray(params.include)) {
        query.include = Array.isArray(params.include) ? params.include.join(';') : params.include;
        delete params.include;
      }
      if (typeof params.embed === 'string' || Array.isArray(params.embed)) {
        query.embed = Array.isArray(params.embed) ? params.embed.join(';') : params.embed;
        delete params.embed;
      }
    }

    try {
      const response: AxiosResponse = await this.getClient().get(`${this.getResourceUrl()}/${id}${qs.stringify(query, { addQueryPrefix: true })}`);

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      Resource.createApiError(error.response, callback);
    }
  }

  /**
   * List resources
   *
   * @param prms - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Optional callback function
   *
   * @returns Resource list
   *
   * @since 1.0.0
   */
  public async list(prms?: any, cb?: ResourceCallback): Promise<List<Model>> {
    const params = cloneDeep(prms);
    try {
      const query: any = {};
      if (isPlainObject(params)) {
        if (typeof params.include === 'string' || Array.isArray(params.include)) {
          query.include = Array.isArray(params.include) ? params.include.join(';') : params.include;
          delete params.include;
        }
        if (typeof params.embed === 'string' || Array.isArray(params.embed)) {
          query.embed = Array.isArray(params.embed) ? params.embed.join(';') : params.embed;
          delete params.embed;
        }
        if (typeof params.limit === 'number' || typeof params.limit === 'string') {
          query.limit = params.limit;
          delete params.limit;
        }
        if (typeof params.from === 'string') {
          query.from = params.from;
          delete params.from;
        }
      }

      const response: AxiosResponse = await this.getClient().get(`${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`);
      const resourceName = this.getResourceName();
      const list = List.buildResourceList({
        response: response.data,
        resourceName,
        params,
        callback: cb,
        getResources: this.list.bind(this),
        Model: (this.constructor as any).model,
      });

      if (typeof cb === 'function') {
        cb(null, list);
      }

      return list;
    } catch (error) {
      Resource.createApiError(error.response, cb);
    }
  }

  /**
   * Update a resource by ID
   *
   * @param id - Resource id
   * @param params - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Optional callback function
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async update(id: string, params: any, cb?: ResourceCallback): Promise<Model> {
    try {
      const response: AxiosResponse = await this.getClient().patch(`${this.getResourceUrl()}/${id}`, params);

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (typeof cb === 'function') {
        cb(null, model);
      }

      return model;
    } catch (error) {
      Resource.createApiError(error.response, cb);
    }
  }

  /**
   * Delete a resource by ID
   *
   * @param id - Resource ID
   * @param params - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Optional callback function
   *
   * @returns In case the API returns the updated object it we'll return a Model.
   *          In other cases the API should respond with `204 No Content`. This is translated
   *          to a boolean value with `true` meaning the correct `204 No Content` response was given.
   *
   * @since 1.0.0
   */
  public async delete(id: string, params?: any, cb?: ResourceCallback): Promise<Model | boolean> {
    try {
      const response: AxiosResponse = await this.getClient().delete(`${this.getResourceUrl()}/${id}`);

      let model;
      if (response.status !== 204) {
        model = new (this.constructor as any).model(response.data);
      } else {
        model = true;
      }

      if (cb) {
        cb(null, model);
      }

      return model;
    } catch (error) {
      Resource.createApiError(error.response, cb);
    }
  }

  /**
   * Get the HTTP client
   *
   * @since 2.0.0
   */
  protected getClient(): AxiosInstance {
    return this.httpClient;
  }

  /**
   * Set the parent ID
   *
   * @since 2.0.0
   */
  protected setParentId(parentId: string): void {
    this.parentId = parentId;
  }

  /**
   * If the parent ID is set
   *
   * @since 2.0.0
   */
  protected hasParentId(): boolean {
    return !!this.parentId;
  }

  /**
   * Create a resource URL with the parent ID
   *
   * @since 2.0.0
   */
  protected getResourceUrl(): string {
    if ((this.constructor as any).resource.indexOf('_') !== -1) {
      const parts = (this.constructor as any).resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return (this.constructor as any).resource;
  }

  /**
   * Get the resource name from the resource identifier
   *
   * @since 2.0.0-rc.2
   */
  protected getResourceName(): string {
    // Instantiate the model to get the defaults
    if ((this.constructor as any).resource.includes('_')) {
      return (this.constructor as any).resource.split('_')[1];
    }

    return (this.constructor as any).resource;
  }
}
