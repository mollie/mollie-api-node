import Payment from 'models/payment';
import CustomersResource from './base';

/**
 * The `customers_payments` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */
export default class CustomersPayments extends CustomersResource {
  static resource = 'customers_payments';
  static model = Payment;

  /**
   * Create a customer payment
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
   * Get a customer payment
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
   * Get all of a customer's payments
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
   */
  all(params, cb) {
    this.setParent(params);
    return super.all(params, cb);
  }
}
