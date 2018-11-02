import Resource from '../resource';
import Refund from '../models/refund';

/**
 * The `refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 2.0.0
 */
export default class Refunds extends Resource {
  static resource = 'refunds';
  static model = Refund;
}
