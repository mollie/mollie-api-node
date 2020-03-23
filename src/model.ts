import { ApiMode } from './data/global';
import { toPlainObject } from 'lodash';

/**
 * Base model
 */
export default class Model {
  public id: string;
  public mode: ApiMode;
  public resource: string;

  /**
   * Converts a model into a plain object
   *
   * @returns {Object}
   * @public ✓ This method is part of the public API
   */
  public toPlainObject(): this {
    return toPlainObject(this);
  }
}
