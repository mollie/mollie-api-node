import omit from 'lodash/omit';

import PaymentsResource from './base';
import Chargeback from '../../models/chargeback';

/**
 * The `payments_refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */
export default class PaymentsChargebacks extends PaymentsResource {
  static resource = 'payments_chargebacks';
  static model = Chargeback;

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
}
