import Model from './model';
import List from './models/List';
import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

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
  public static readonly apiName: string;
  /**
   * @var {string} resourcePrefix
   */
  public static readonly resourcePrefix: string;
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
  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  /**
   * Error handler
   */
  protected static errorHandler(response: AxiosResponse, cb?: Function) {
    const error = (response && response.data) || response;

    if (cb) {
      return cb(error);
    }
    throw error;
  }

  /**
   * Get the API client
   *
   * @since 2.0.0
   */
  protected getClient() {
    return this.httpClient;
  }

  /**
   * Set the parent ID by providing the parent
   *
   * @since 1.1.1
   *
   * @deprecated This method is not available
   */
  protected withParent(parent: any) {
    if (parent && parent.id) {
      this.setParentId(parent.id);
    }
    return this;
  }

  /**
   * Set the parent ID
   *
   * @since 2.0.0
   */
  protected setParentId(parentId: string) {
    this.parentId = parentId;
  }

  /**
   * If the parent ID is set
   *
   * @since 2.0.0
   */
  hasParentId(): boolean {
    return !!this.parentId;
  }

  /**
   * Create a resource URL with the parent ID
   *
   * @since 2.0.0
   */
  protected getResourceUrl(): string {
    if ((this.constructor as typeof Resource).model.resource.indexOf('_') !== -1) {
      const parts = (this.constructor as typeof Resource).model.resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return (this.constructor as typeof Resource).model.resource;
  }

  /**
   * Get the resource name from the resource identifier
   *
   * @since 2.0.0-rc.2
   */
  protected getResourceName(): string {
    if ((this.constructor as typeof Resource).model.resource.includes('_')) {
      return (this.constructor as typeof Resource).model.resource.split('_')[1];
    }

    return (this.constructor as typeof Resource).model.resource;
  }

  // CREATE

  /**
   * Create a resource by ID
   *
   * @params {any}      data Resource data
   * @params {Function} cb   Callback function, can be used instead of the returned Promise
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   *
   * @api ✓ This method is part of the public API
   */
  public async create(params: any, cb?: Function): Promise<Model> {
    const callback = typeof params === 'function' ? params : cb;
    let query: any = {};
    if (typeof params === 'object' && typeof params.include === 'string') {
      query.include = params.include;
      delete params.include;
    }

    try {
      const response: AxiosResponse = await this.getClient().post(
        `${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`,
        params,
      );

      const model = new ((this.constructor as typeof Resource).model as any)(response.data);

      if (callback) {
        return callback(null, model);
      }
      return model;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }

  // READ: consists of get (one) and list (many)

  /**
   * Get a resource by ID
   *
   * @params {string}   id     Resource ID
   * @params {any}      params Resource-specific parameters
   * @params {Function} cb     You can use a callback in case you do not prefer to use Promises
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async get(id: string, params?: any, cb?: Function): Promise<Model> {
    const callback = typeof params === 'function' ? params : cb;

    try {
      const response: AxiosResponse = await this.getClient().get(`${this.getResourceUrl()}/${id}`, {
        params,
      });

      const model = new ((this.constructor as typeof Resource).model as any)(response);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }

  /**
   * List resources
   *
   * @params {any} params Resource-specific parameters
   *
   *
   * @since 1.0.0
   */
  public async list(params?: any, cb?: Function): Promise<List<Model>> {
    const callback = typeof params === 'function' ? params : cb;

    try {
      const response: AxiosResponse = await this.getClient().get(this.getResourceUrl(), { params });
      const resourceName = this.getResourceName();
      const list = List.buildResourceList({
        response: response.data,
        resourceName,
        params,
        callback,
        getResources: this.list.bind(this),
        Model: Resource.model,
      });

      if (callback) {
        return callback(null, list);
      }

      return list;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }

  // UPDATE

  /**
   *
   * Update a resource by ID
   *
   * @param {string} id
   * @param data
   * @param {Function} cb
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async update(id: string, data: any, cb?: Function): Promise<Model> {
    const callback = typeof data === 'function' ? data : cb;

    try {
      const response: AxiosResponse = await this.getClient().post(
        `${this.getResourceUrl()}/${id}`,
        data,
      );

      const model = new ((this.constructor as typeof Resource).model as any)(response);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }

  // DELETE

  /**
   * Delete a resource by ID
   *
   * @param {string}   id       Resource ID
   * @param {any}      params
   * @param {Function} cb Optional callback function
   *
   * @returns {Promise<Model|boolean>} In case the API returns the updated object it we'll return a Model.
   *                                   In other cases the API should respond with `204 No Content`. This is translated
   *                                   to a boolean value with `true` meaning the correct `204 No Content` response was given.
   *
   * @since 1.0.0
   * @since 2.2.0 Accepts access token parameters
   */
  public async delete(id: string, params?: any, cb?: Function): Promise<Model | boolean> {
    // TODO: add support for access token parameters
    const callback = typeof params === 'function' ? params : cb;
    try {
      const response: AxiosResponse = await this.getClient().delete(
        `${this.getResourceUrl()}/${id}`,
      );

      const model = new ((this.constructor as typeof Resource).model as any)(response);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }
}
