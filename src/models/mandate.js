import MollieModel from 'mollie-model';

/**
 * The `Mandate` model
 */
export default class Mandate extends MollieModel {
  static STATUS_VALID = 'valid';
  static STATUS_INVALID = 'invalid';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'mandate',
      id: null,
      status: null,
      method: null,
      customerId: null,
      details: null,
      createdDatetime: null,
    };

    Object.assign(this, defaults, props);
  }

  /**
   * If the mandate is valid
   * @returns {boolean}
   */
  isValid() {
    return this.status === Mandate.STATUS_VALID;
  }
}
