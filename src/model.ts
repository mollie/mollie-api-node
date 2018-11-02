import toPlainObject from 'lodash/toPlainObject';

/**
 * Base model
 */
export default class Model {
  data: any;
  constructor(data: any) {
    this.data = data;
  }
  /**
   * Converts a model into a plain object
   * @returns {Object}
   */
  toPlainObject() {
    return toPlainObject(this);
  }
}
