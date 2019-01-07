import omit from 'lodash/omit';

import PaymentRefund from '../../models/paymentRefund';
import OrdersResource from './base';

/**
 * The `orders_refunds` resource
 *
 * @since 2.2.0
 */
export default class OrdersRefunds extends OrdersResource {
  static resource = 'orders_refunds';
  static model = PaymentRefund;

  /**
   * Create an order refund
   *
   * @since 2.2.0
   */
  create(data: Partial<Mollie.OrderRefund>, cb?: Function) {
    this.setParent(data);

    if (typeof data === 'object') {
      data = omit(data, 'orderId'); // eslint-disable-line no-param-reassign
    }

    return super.create(data, cb);
  }

  /**
   * Get all order refunds
   *
   * @since 2.2.0
   */
  all(params?: any, cb?: Function) {
    this.setParent(params);

    if (typeof params === 'object') {
      params = omit(params, 'orderId'); // eslint-disable-line no-param-reassign
    }

    return super.all(params, cb);
  }
}
