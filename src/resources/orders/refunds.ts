import Refund from '../../models/Refund';
import OrdersResource from './base';
import List from '../../models/List';

/**
 * The `orders_refunds` resource
 *
 * @since 2.2.0
 */
export default class OrdersRefunds extends OrdersResource {
  static resource = 'orders_refunds';
  static model = Refund;

  /**
   * Create an order refund
   *
   * @since 2.2.0
   */
  create(params: Mollie.OrderRefund.Params.ICreate, cb?: Function) {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.create(parameters, cb);
  }

  /**
   * Get all order refunds
   *
   * @since 2.2.0
   */
  public async list(params: Mollie.OrderRefund.Params.IList, cb?: Function): Promise<List<Refund>> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.list(parameters, cb);
  }
}
