import Model from '../model';
/**
 * The `Mandate` model
 */
export default class Mandate extends Model implements Mollie.MandateResponse {
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  status: Mollie.MandateStatus;
  method: 'directdebit' | 'creditcard';
  details: Mollie.MandateDetails;
  mandateReference: string;
  signatureDate: string;
  createdAt: string;
  _links: Mollie.Links;

  // Access token parameters
  testmode?: boolean;

  static STATUS_VALID = 'valid';
  static STATUS_INVALID = 'invalid';

  constructor(props?: Partial<Mollie.MandateResponse>) {
    super(props);

    const defaults: Mollie.MandateResponse = {
      resource: 'mandate',
      id: null,
      status: null,
      method: null,
      details: null,
      mode: null,
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
