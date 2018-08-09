import Model from 'model';

/**
 * The `Mandate` model
 */
export default class Mandate extends Model {
  static STATUS_VALID = 'valid';
  static STATUS_INVALID = 'invalid';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'mandate',
      id: null,
      status: null,
      method: null,
      details: null,
      mandateReference: null,
      signatureDate: null,
      createdAt: null,
      _links: {
        customer: null,
      },
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
