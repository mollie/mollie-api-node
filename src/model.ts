import { toPlainObject } from 'lodash';
import { AxiosResponse } from 'axios';

/**
 * Base model
 */
export default class Model {
  public id: string;
  public mode: Mollie.ApiMode;
  public resource: string;

  private data: any;
  private response: AxiosResponse;

  /**
   * Model constructor
   *
   * @param {AxiosResponse|any} data Accepts an AxiosResponse
   *                                 or a raw JSON response (deprecated)
   */
  constructor(data: AxiosResponse | any) {
    if (data && data.constructor && data.constructor.name === 'AxiosResponse') {
      this.response = data;
      this.data = data; // Backwards compatible
    } else {
      this.data = data; // Backwards compatible
    }
  }

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
