/* eslint-disable new-cap */
import List from './models/list';
import { AxiosInstance, AxiosResponse } from 'axios';

/**
 * The base resource
 * @private
 */
export default class Resource {
  private readonly httpClient: AxiosInstance;
  private parentId: number;
  public static resource: string;
  public static model: any;
  /**
   * Constructor
   */
  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  /**
   * Error handler
   */
  private static errorHandler(response: AxiosResponse, cb?: Function) {
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
  private getClient() {
    return this.httpClient;
  }

  /**
   * Set the parent ID by providing the parent
   *
   * @since 1.1.1
   * @deprecated
   */
  withParent(parent: any) {
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
  private getResourceUrl(): string {
    if ((this.constructor as typeof Resource).resource.indexOf('_') !== -1) {
      const parts = (this.constructor as typeof Resource).resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return (this.constructor as typeof Resource).resource;
  }

  /**
   * Get the resource name from the resource identifier
   * @since 2.0.0-rc.2
   */
  private getResourceName(): string {
    if ((this.constructor as typeof Resource).resource.includes('_')) {
      return (this.constructor as typeof Resource).resource.split('_')[1];
    }

    return (this.constructor as typeof Resource).resource;
  }

  /**
   * Create a resource by ID
   * @since 1.0.0
   */
  create(data: any, cb?: Function): Promise<any> {
    let query = '';
    if (typeof data === 'function') {
      cb = data; // eslint-disable-line no-param-reassign
    } else if (typeof data === 'object' && typeof data.include === 'string') {
      query = `?include=${data.include}`;
      delete data.include;
    }

    return this.getClient()
      .post(`${this.getResourceUrl()}${query}`, data)
      .then(response => {
        const model = new (this.constructor as typeof Resource).model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }

  /**
   * Get a resource by ID
   * @since 1.0.0
   */
  get(id: string, params?: any, cb?: Function) {
    if (typeof params === 'function') {
      cb = params; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .get(`${this.getResourceUrl()}/${id}`, { params })
      .then(response => {
        const model = new (this.constructor as typeof Resource).model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch((error: any) => Resource.errorHandler(error.response, cb));
  }

  /**
   * Get all resources
   * @since 1.0.0
   */
  all(params?: any, cb?: Function) {
    if (typeof params === 'function') {
      cb = params; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .get(this.getResourceUrl(), { params })
      .then(response => {
        const resourceName = this.getResourceName();
        const list = List.buildResourceList({
          response: response.data,
          resourceName,
          params,
          callback: cb,
          getResources: this.all.bind(this),
          Model: (this.constructor as typeof Resource).model,
        });

        if (cb) {
          return cb(null, list);
        }
        return list;
      })
      .catch((error: any) =>
        (this.constructor as typeof Resource).errorHandler(error.response, cb),
      );
  }

  /**
   * Update a resource by ID
   * @since 1.0.0
   */
  update(id: string, data: any, cb?: Function) {
    if (typeof data === 'function') {
      cb = data; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .post(`${this.getResourceUrl()}/${id}`, data)
      .then(response => {
        const model = new (this.constructor as typeof Resource).model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => (this.constructor as typeof Resource).errorHandler(error.response, cb));
  }

  /**
   * Delete a resource by ID
   * @since 1.0.0
   */
  delete(id: string, cb?: Function) {
    return this.getClient()
      .delete(`${this.getResourceUrl()}/${id}`)
      .then(response => {
        const model = new (this.constructor as typeof Resource).model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => (this.constructor as typeof Resource).errorHandler(error.response, cb));
  }
}
