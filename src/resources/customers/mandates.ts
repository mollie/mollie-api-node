import omit from 'lodash/omit';

import CustomersResource from './base';
import Mandate from '../../models/mandate';

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
  create(data: any, cb?: Function) {
    this.setParent(data);

    if (typeof data === 'object') {
      data = omit(data, 'customerId'); // eslint-disable-line no-param-reassign
    }

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
  get(id: string, params: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
    }

    return super.get(id, params, cb);
  }

  /**
   * Get all of a customer's mandates
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.2.0
   */
  all(params: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
    }

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
  delete(id: string, params: any, cb?: Function) {
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
  cancel() {
    return this.delete(arguments[0], arguments[1], arguments[2]);
  }

  /**
   * Alias of delete
   * @since 2.0.0
   */
  revoke() {
    return this.delete(arguments[0], arguments[1], arguments[2]);
  }
}
