import Resource from '../resource';
import Line from '../models/Line';

/**
 * The `orders` resource
 *
 * @since 2.2.0
 */
export default class Lines extends Resource {
  static resource = 'lines';
  static model = Line;
}
