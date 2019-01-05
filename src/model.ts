import toPlainObject from 'lodash/toPlainObject';

/**
 * Base model
 */
export default class Model {
  private data: any;
  public id: string;
  public mode: Mollie.ApiMode;
  public resource: string;

  constructor(data: any) {
    this.data = data;
  }
  /**
   * Converts a model into a plain object
   *
   * @returns {Object}
   * @api
   */
  public toPlainObject() {
    return toPlainObject(this);
  }
}
