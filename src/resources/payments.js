import Resource from './base';
import Payment from '../models/payment';

/**
 * The `payments` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */
export default class Payments extends Resource {
  static resource = 'payments';
  static model = Payment;
}
