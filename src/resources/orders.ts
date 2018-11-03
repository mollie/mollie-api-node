import Resource from '../resource';
import Order from '../models/order';

/**
 * The `orders` resource
 *
 * @since 2.2.0
 */
export default class Orders extends Resource {
  static resource = 'orders';
  static model = Order;
}
