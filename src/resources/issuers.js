import Base from './base';
import Issuer from '../models/issuer';

/**
 * The `issuers` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */
export default class Issuers extends Base {
  static resource = 'issuers';
  static model = Issuer;
}
