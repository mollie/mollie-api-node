import omit from 'lodash/omit';

import PaymentsResource from './base';
import Refund from '../../models/refund';

/**
 * The `payments_refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */
export default class PaymentsRefunds extends PaymentsResource {
  static resource = 'payments_refunds';
  static model = Refund;

  /**
   * Create a payment refund
   * @since 1.1.1
   */
  create(data: any, cb?: Function) {
    this.setParent(data);

    if (typeof data === 'object') {
      data = omit(data, 'paymentId'); // eslint-disable-line no-param-reassign
    }

    return super.create(data, cb);
  }

  /**
   * Get a payment refund by ID
   * @since 1.1.1
   */
  get(id: string, params?: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'paymentId'); // eslint-disable-line no-param-reassign
    }

    return super.get(id, params, cb);
  }

  /**
   * Get all payment refunds
   * @since 1.1.1
   */
  all(params?: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'paymentId'); // eslint-disable-line no-param-reassign
    }

    return super.all(params, cb);
  }

  /**
   * Delete a payment_refund by ID
   * @since 1.1.1
   */
  delete(id: string, params?: any, cb?: Function) {
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
}
