import Resource from '../../resource';
import Order from '../../models/Order';
import List from '../../models/List';

/**
 * The `orders` resource
 *
 * @static {string} resource
 * @static {Model}  model
 * @static {string} apiName
 *
 * @since 2.2.0
 */
export default class Orders extends Resource {
  public static resource = 'orders';
  public static model = Order;
  public static apiName = 'Orders API';

  // API METHODS

  /**
   * Create an Order.
   *
   * @param {Mollie.Order.Params.ICreate} params
   * @param {Mollie.Order.Callback.Create} cb
   *
   * @returns {Promise<Order>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async create(
    params: Mollie.Order.Params.ICreate,
    cb?: Mollie.Order.Callback.Create,
  ): Promise<Order> {
    return super.create(params, cb) as Promise<Order>;
  }

  /**
   * Retrieve an Order.
   *
   * @param {string} id
   * @param {Mollie.Order.Params.IGet} params
   * @param {Mollie.Order.Callback.Get} cb
   *
   * @returns {Promise<Order>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async get(
    id: string,
    params: Mollie.Order.Params.IGet,
    cb?: Mollie.Order.Callback.Get,
  ): Promise<Order> {
    return super.get(id, params, cb) as Promise<Order>;
  }

  /**
   * List Orders.
   *
   * @param {Mollie.Order.Params.IGet} params
   * @param {Mollie.Order.Callback.Get} cb
   *
   * @returns {Promise<List<Order>>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async list(
    params?: Mollie.Order.Params.IGet,
    cb?: Mollie.Order.Callback.Get,
  ): Promise<List<Order>> {
    return super.list(params, cb) as Promise<List<Order>>;
  }

  /**
   * Update an Order.
   *
   * @param {string} id
   * @param {Mollie.Order.Params.IUpdate} data
   * @param {Mollie.Order.Callback.Update} cb
   *
   * @returns {Promise<Order>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async update(
    id: string,
    data: Mollie.Order.Params.IUpdate,
    cb?: Mollie.Order.Callback.Update,
  ): Promise<Order> {
    return super.update(id, data, cb) as Promise<Order>;
  }

  /**
   * Cancel an Order.
   *
   * @param {string} id
   * @param {Mollie.Order.Params.ICancel} params
   * @param {Mollie.Order.Callback.Cancel} cb
   *
   * @returns {Promise<Order>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async cancel(
    id: string,
    params?: Mollie.Order.Params.ICancel,
    cb?: Mollie.Order.Callback.Cancel,
  ): Promise<Order> {
    return super.delete(id, params, cb) as Promise<Order>;
  }

  // ALIASES

  /**
   * Cancel an Order.
   *
   * @since 2.2.0
   *
   * @see
   * @api
   * @alias cancel
   */
  delete = this.cancel;

  /**
   * List Orders.
   *
   * @since 2.2.0
   *
   * @see
   * @api
   * @alias list
   */
  all = this.list;
}
