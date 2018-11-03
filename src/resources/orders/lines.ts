import Line from '../../models/line';
import OrdersResource from './base';

/**
 * The `orders_lines` resource
 *
 * @since 2.2.0
 */
export default class OrdersLines extends OrdersResource {
  static resource = 'orders_lines';
  static model = Line;

  /**
   * Delete a order_line by ID
   *
   * @since 2.2.0
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
   *
   * @since 2.2.0
   */
  cancel() {
    return this.delete(arguments[0], arguments[1], arguments[2]);
  }
}
