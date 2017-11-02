import MollieResource from 'mollie-resource';
import Chargeback from 'models/chargeback';

/**
 * The `chargebacks` resource
 * @static {string} resource
 * @static {Object} model
 * @since 2.0.0-rc.1
 */
export default class Chargebacks extends MollieResource {
  static resource = 'chargebacks';
  static model = Chargeback;
}
