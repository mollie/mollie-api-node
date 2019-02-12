/* eslint-disable new-cap */
import qs from 'qs';
import { AxiosInstance, AxiosResponse } from 'axios';
import { cloneDeep, isPlainObject } from 'lodash';

import Model from './model';
import List from './models/List';

/**
 * @deprecated since 2.2.0
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
   * Error handler
   */
  protected static errorHandler(response: any, cb?: Function): any {
    const error = (response && response.data) || response;

    if (cb) {
      return cb(error);
    }
    return error;
  }

  /**
   * Set the parent ID by providing the parent
   *
   * @since 1.1.1
   *
   * @deprecated This method is not available
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
   * @params cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned Promise
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
      if (typeof params.include === 'string') {
        query.include = params.include;
        delete params.include;
      }
      if (typeof params.embed !== 'undefined' && Array.isArray(params.embed)) {
        query.embed = params.embed.join(';');
        delete params.embed;
      }
    }

    try {
      const response: AxiosResponse = await this.getClient().post(
        `${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`,
        params,
      );

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (callback) {
        return callback(null, model);
      }
      return model;
    } catch (error) {
      throw Resource.errorHandler(error.response, callback);
    }
  }

  /**
   * Get a resource by ID
   *
   * @params id - Resource ID
   * @params params - Resource-specific parameters
   * @params cb - (DEPRECATED SINCE 2.2.0) Optional callback function
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
      if (typeof params.include === 'string') {
        query.include = params.include;
        delete params.include;
      }
      if (typeof params.embed !== 'undefined' && Array.isArray(params.embed)) {
        query.embed = params.embed.join(';');
        delete params.embed;
      }
    }

    try {
      const response: AxiosResponse = await this.getClient().get(
        `${this.getResourceUrl()}/${id}${qs.stringify(query, { addQueryPrefix: true })}`,
      );

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      throw Resource.errorHandler(error.response, callback);
    }
  }

  /**
   * List resources
   *
   * @param prms - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Optional callback function
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
          query.include = params.include;
          delete params.include;
        }
        if (typeof params.embed !== 'undefined' && Array.isArray(params.embed)) {
          query.embed = params.embed.join(';');
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

      const response: AxiosResponse = await this.getClient().get(
        `${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`,
      );
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
      throw Resource.errorHandler(error, cb);
    }
  }

  /**
   * Update a resource by ID
   *
   * @param id - Resource id
   * @param params - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Optional callback function
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async update(id: string, params: any, cb?: ResourceCallback): Promise<Model> {
    try {
      const response: AxiosResponse = await this.getClient().post(`${this.getResourceUrl()}/${id}`, params);

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (typeof cb === 'function') {
        cb(null, model);
      }

      return model;
    } catch (error) {
      throw Resource.errorHandler(error.response, cb);
    }
  }

  /**
   * Delete a resource by ID
   *
   * @param id - Resource ID
   * @param params - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Optional callback function
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

      // noinspection JSPotentiallyInvalidConstructorUsage
      const model = new (this.constructor as any).model(response.data);

      if (cb) {
        cb(null, model);
      }

      return model;
    } catch (error) {
      throw Resource.errorHandler(error.response, cb);
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
