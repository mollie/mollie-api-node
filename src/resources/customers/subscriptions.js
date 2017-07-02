import CustomersBase from './base';
import Subscription from '../../models/subscription';

/**
 * The `customers_subscriptions` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.3.2
 */
export default class CustomersSubscriptions extends CustomersBase {
  static resource = 'customers_subscriptions';
  static model = Subscription;

  /**
   * Create a customer subscription
   * @param {Object} [data]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.3.2
   */
  create(data, cb) {
    this.setParent(data);
    return super.create(data, cb);
  }

  /**
   * Get a customer subscription
   * @param id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.3.2
   */
  get(id, params, cb) {
    this.setParent(params);
    return super.get(id, params, cb);
  }

  /**
   * Get all customer's subscriptions
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.3.2
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
   * @since 1.3.2
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
  cancel(id, params, cb) {
    return this.delete(id, params, cb);
  }
}