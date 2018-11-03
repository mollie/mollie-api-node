import Resource from '../resource';
import Payment from '../models/payment';

/**
 * The `payments` resource
 *
 * @since 1.0.0
 */
export default class Payments extends Resource {
  static resource = 'payments';
  static model = Payment;
}
