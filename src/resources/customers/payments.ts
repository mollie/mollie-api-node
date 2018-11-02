import omit from 'lodash/omit';

import CustomersResource from './base';
import Payment from '../../models/payment';

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
  create(data: any, cb?: Function) {
    this.setParent(data);

    if (typeof data === 'object') {
      data = omit(data, 'customerId'); // eslint-disable-line no-param-reassign
    }

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
  get(id: string, params: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
    }

    return super.get(id, params, cb);
  }

  /**
   * Get all of a customer's payments
   * @param {Object} [params]
   * @param {function} [cb]
   * @returns {Promise.<T>}
   * @since 1.1.1
   */
  all(params: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
    }

    return super.all(params, cb);
  }
}
