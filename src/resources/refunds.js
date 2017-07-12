import MollieResource from 'MollieResource';
import Refund from 'models/refund';

/**
 * The `refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 2.0.0
 */
export default class Refunds extends MollieResource {
  static resource = 'refunds';
  static model = Refund;
}
