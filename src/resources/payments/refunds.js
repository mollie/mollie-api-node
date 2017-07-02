import PaymentsBase from './base';
import Refund from '../../models/refund';

/**
 * The `payments_refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */
export default class PaymentsRefunds extends PaymentsBase {
  static resource = 'payments_refunds';
  static model = Refund;

  /**
   * Create a payment refund
   * @param {Object} [data]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
   */
  create(data, cb) {
    this.setParent(data);
    return super.create(data, cb);
  }

  /**
   * Get a payment refund by ID
   * @param {number} id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
   */
  get(id, params, cb) {
    this.setParent(params);
    return super.get(id, params, cb);
  }

  /**
   * Get all payment refunds
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
   */
  all(params, cb) {
    this.setParent(params);
    return super.all(params, cb);
  }

  /**
   * Delete a payment_refund by ID
   * @param {number} id
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
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
}
