import Model from './model';
import List from './models/List';
import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

/**
 * @deprecated since 2.2.0
 */
type Callback = (error: any, resource: any) => void;

/**
 * The base resource
 */
export default class Resource {
  /**
   * Resource code such as `payments`
   * @var {string} resource
   */
  public resource: string;
  /**
   * Refers to a Model class
   * @var {Model} model
   */
  public model: any;
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
  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  /**
   * Error handler
   */
  protected static errorHandler(response: any, cb?: Function) {
    const error = (response && response.data) || response;

    if (cb) {
      return cb(error);
    }
    throw error;
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
   * Set the parent ID by providing the parent
   *
   * @since 1.1.1
   *
   * @deprecated This method is not available
   */
  public withParent(parent: any): this {
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
    if (this.resource.indexOf('_') !== -1) {
      const parts = this.resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return this.resource;
  }

  /**
   * Get the resource name from the resource identifier
   *
   * @since 2.0.0-rc.2
   */
  protected getResourceName(): string {
    // Instantiate the model to get the defaults
    if (this.resource.includes('_')) {
      return this.resource.split('_')[1];
    }

    return this.resource;
  }

  // CREATE

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
  public async create(params: any, cb?: Callback): Promise<Model> {
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

      const model = new this.model(response.data);

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
   * @params id - Resource ID
   * @params params - Resource-specific parameters
   * @params cb - (DEPRECATED SINCE 2.2.0) Optional callback function
   *
   * @returns {Promise<Model>}
   *
   * @since 1.0.0
   */
  public async get(id: string, params?: any, cb?: Callback): Promise<Model> {
    const callback = typeof params === 'function' ? params : cb;

    try {
      const response: AxiosResponse = await this.getClient().get(`${this.getResourceUrl()}/${id}`, {
        params,
      });

      const model = new this.model(response.data);

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
   * @param params - Resource-specific parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Optional callback function
   *
   * @returns Resource list
   *
   * @since 1.0.0
   */
  public async list(params?: any, cb?: Callback): Promise<List<Model>> {
    try {
      const response: AxiosResponse = await this.getClient().get(this.getResourceUrl(), { params });
      const resourceName = this.getResourceName();
      const list = List.buildResourceList({
        response: response.data,
        resourceName,
        params,
        cb,
        getResources: this.list.bind(this),
        Model: this.model,
      });

      if (typeof cb === 'function') {
        cb(null, list);
      }

      return list;
    } catch (error) {
      Resource.errorHandler(error, cb);
    }
  }

  // UPDATE

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
  public async update(id: string, params: any, cb?: Callback): Promise<Model> {
    try {
      const response: AxiosResponse = await this.getClient().post(`${this.getResourceUrl()}/${id}`, params);

      const model = new this.model(response.data);

      if (typeof cb === 'function') {
        cb(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, cb);
    }
  }

  // DELETE

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
  public async delete(id: string, params?: any, cb?: Callback): Promise<Model | boolean> {
    try {
      const response: AxiosResponse = await this.getClient().delete(`${this.getResourceUrl()}/${id}`);

      const model = new this.model(response.data);

      if (cb) {
        cb(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, cb);
    }
  }
}
