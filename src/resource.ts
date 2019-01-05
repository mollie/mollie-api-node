import List from './models/list';
import Model from './model';
import { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

/**
 * The base resource
 */
export default class Resource {
  protected readonly httpClient: AxiosInstance;
  public readonly apiName: string;
  public readonly resourcePrefix: string;
  protected parentId: number;
  public static resource: string;
  public static model: ConstructableModel<Model>;

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
   * @deprecated
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
  protected setParentId(parentId: number) {
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
   * @since 1.0.0
   */
  public async create(data: any, cb?: Function): Promise<Model> {
    const callback = typeof data === 'function' ? data : cb;
    let query: any = {};
    if (typeof data === 'object' && typeof data.include === 'string') {
      query.include = data.include;
      delete data.include;
    }

    try {
      const response: AxiosResponse = await this.getClient().post(
        `${this.getResourceUrl()}${qs.stringify(query, { addQueryPrefix: true })}`,
        data,
      );
      const model = new (this.constructor as typeof Resource).model(response.data);

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
   * @since 1.0.0
   */
  public async get(id: string, params?: any, cb?: Function): Promise<Model> {
    const callback = typeof params === 'function' ? params : cb;

    try {
      const response: AxiosResponse = await this.getClient().get(`${this.getResourceUrl()}/${id}`, {
        params,
      });

      const model = new (this.constructor as typeof Resource).model(response.data);

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
   * @returns {Promise<AxiosResponse>}
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
      const model = new (this.constructor as typeof Resource).model(response.data);

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
   * @param {Function} callback Optional callback function
   *
   * @returns {Promise<AxiosResponse>}
   *
   * @since 1.0.0
   */
  public async delete(id: string, callback?: Function): Promise<Model> {
    try {
      const response: AxiosResponse = await this.getClient().delete(
        `${this.getResourceUrl()}/${id}`,
      );
      const model = new (this.constructor as typeof Resource).model(response.data);

      if (callback) {
        return callback(null, model);
      }

      return model;
    } catch (error) {
      Resource.errorHandler(error.response, callback);
    }
  }
}
