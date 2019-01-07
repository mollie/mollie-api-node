import Line from '../../models/Line';
import OrdersResource from './base';
import Order from '../../models/Order';

/**
 * The `orders_lines` resource
 *
 * @since 2.2.0
 */
export default class OrdersLines extends OrdersResource {
  static resource = 'orders_lines';
  static model = Line;

  /**
   * Update order lines
   *
   * @param {string} id
   * @param {Mollie.OrderLine.Params.IUpdate} params
   * @param {Mollie.OrderLine.Callback.Update} cb
   *
   * @returns {Promise<Order>}
   *
   * @since 2.2.0
   *
   * @see
   * @public ✓ This method is part of the public API
   */
  public async update(
    id: string,
    params: Mollie.OrderLine.Params.IUpdate,
    cb?: Mollie.OrderLine.Callback.Update,
  ): Promise<Order> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.update(id, parameters, cb) as Promise<Order>;
  }

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @param {string} id
   * @param {Mollie.OrderLine.Params.ICancel}  params
   * @param {Mollie.OrderLine.Callback.Cancel} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<boolean>}
   *
   * @since 2.2.0
   *
   * @see
   * @public ✓ This method is part of the public API
   */
  public async cancel(
    id: string,
    params?: Mollie.OrderLine.Params.ICancel,
    cb?: Mollie.OrderLine.Callback.Cancel,
  ): Promise<boolean> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    // TODO: check return type
    return super.delete(id, parameters, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @since 2.2.0
   *
   * @see
   * @public ✓ This method is part of the public API
   */
  delete = this.cancel;
}
