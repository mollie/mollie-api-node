import Base from './base';
import Method from '../models/method';

/**
 * The `methods` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */
export default class Methods extends Base {
  static resource = 'methods';
  static model = Method;
}
