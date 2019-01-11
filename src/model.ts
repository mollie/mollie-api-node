import { toPlainObject } from 'lodash';
import { ApiMode } from './types/global';

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
  public toPlainObject() {
    return toPlainObject(this);
  }
}
