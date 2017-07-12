import Mandate from 'models/mandate';
import CustomersResource from './base';

/**
 * The `customers_mandates` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.2.0
 */
export default class CustomersMandates extends CustomersResource {
  static resource = 'customers_mandates';
  static model = Mandate;

  /**
   * Create a customer mandate
   * @param {Object} [data]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.2.0
   */
  create(data, cb) {
    this.setParent(data);
    return super.create(data, cb);
  }

  /**
   * Get a customer mandate by ID
   * @param id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.2.0
   */
  get(id, params, cb) {
    this.setParent(params);
    return super.get(id, params, cb);
  }

  /**
   * Get all of a customer's mandates
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.2.0
   */
  all(params, cb) {
    this.setParent(params);
    return super.all(params, cb);
  }

  /**
   * Delete a customer subscription
   * @param id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 2.0.0
   */
  delete(id, params, cb) {
    if (typeof params === 'function') {
      cb = params; // eslint-disable-line no-param-reassign
    }

    this.setParent(params);
    return super.delete(id, cb);
  }

  /**
   * Alias for delete
   * @since 1.3.2
   */
  cancel(...args) {
    return this.delete(...args);
  }

  /**
   * Alias of delete
   * @since 2.0.0
   */
  revoke(...args) {
    return this.delete(...args);
  }
}
