/* eslint-disable new-cap */
import List from 'models/list';

/**
 * The base resource
 * @param {Object} httpClient
 * @private
 */
export default class Resource {
  /**
   * Constructor
   * @param httpClient
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Error handler
   * @param {*} response
   * @param {function} [cb]
   * @since 2.0.0
   * @private
   */
  static errorHandler(response, cb) {
    const error = (response && response.data) || response;

    if (cb) {
      return cb(error);
    }
    throw error;
  }

  /**
   * Get the API client
   * @returns {Object} httpClient
   * @since 2.0.0
   * @private
   */
  getClient() {
    return this.httpClient;
  }

  /**
   * Set the parent ID by providing the parent
   * @param parent
   * @since 1.1.1
   * @deprecated
   */
  withParent(parent) {
    if (parent && parent.id) {
      this.setParentId(parent.id);
    }
    return this;
  }

  /**
   * Set the parent ID
   * @param {number} parentId
   * @since 2.0.0
   * @protected
   */
  setParentId(parentId) {
    this.parentId = parentId;
  }

  /**
   * If the parent ID is set
   * @returns {boolean}
   * @since 2.0.0
   */
  hasParentId() {
    return !!this.parentId;
  }

  /**
   * Create a resource URL with the parent ID
   * @returns {string} resourceUrl
   * @since 2.0.0
   * @private
   */
  getResourceUrl() {
    if (this.constructor.resource.indexOf('_') !== -1) {
      const parts = this.constructor.resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return this.constructor.resource;
  }

  /**
   * Get the resource name from the resource identifier
   * @returns {string} resourceUrl
   * @since 2.0.0-rc.2
   * @private
   */
  getResourceName() {
    if (this.constructor.resource.includes('_')) {
      return this.constructor.resource.split('_')[1];
    }

    return this.constructor.resource;
  }

  /**
   * Create a resource by ID
   * @param {Object} [data]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.0.0
   */
  create(data, cb) {
    if (typeof data === 'function') {
      cb = data; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .post(this.getResourceUrl(), data)
      .then(response => {
        const model = new this.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }

  /**
   * Get a resource by ID
   * @param {number} id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.0.0
   */
  get(id, params, cb) {
    if (typeof params === 'function') {
      cb = params; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .get(`${this.getResourceUrl()}/${id}`, { params })
      .then(response => {
        const model = new this.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }

  /**
   * Get all resources
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.0.0
   */
  all(params, cb) {
    if (typeof params === 'function') {
      cb = params; // eslint-disable-line no-param-reassign
    }
    
    // offset and count parameters should be passed as queryParameters, so they have a special treatment.
    var idOverride = "", tempParams = [];
    if (params && params.offset>=0) tempParams.push("offset=" + params.offset);
    if (params.count && params>=0) tempParams.push("count=" + params.count);
    if (tempParams.length>0) idOverride = '?' + tempParams.join('&');
    
    return this.getClient()
      .get(this.getResourceUrl() + idOverride, { params })
      .then(response => {
        const resourceName = this.getResourceName();
        const list = List.buildResourceList({
          response: response.data,
          resourceName,
          params,
          callback: cb,
          getResources: this.all.bind(this),
          Model: this.constructor.model,
        });

        if (cb) {
          return cb(null, list);
        }
        return list;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }

  /**
   * Update a resource by ID
   * @param {number} id
   * @param {Object} [data]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.0.0
   */
  update(id, data, cb) {
    if (typeof data === 'function') {
      cb = data; // eslint-disable-line no-param-reassign
    }

    return this.getClient()
      .post(`${this.getResourceUrl()}/${id}`, data)
      .then(response => {
        const model = new this.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }

  /**
   * Delete a resource by ID
   * @param {number} id
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.0.0
   */
  delete(id, cb) {
    return this.getClient()
      .delete(`${this.getResourceUrl()}/${id}`)
      .then(response => {
        const model = new this.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      })
      .catch(error => Resource.errorHandler(error.response, cb));
  }
}
