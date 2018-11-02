import Resource from '../resource';
import Method from '../models/method';

/**
 * The `methods` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */
export default class Methods extends Resource {
  static resource = 'methods';
  static model = Method;
}
