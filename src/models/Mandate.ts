import Model from '../model';
/**
 * The `Mandate` model
 */
export default class Mandate extends Model implements Mollie.IMandate {
  public static resourcePrefix = 'mdt_';
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  status: Mollie.Mandate.Status;
  method: Mollie.Mandate.Method;
  details: Mollie.Mandate.IDetails;
  mandateReference: string;
  signatureDate: string;
  createdAt: string;
  _links: Mollie.ILinks;

  // Access token parameters
  testmode?: boolean;

  constructor(props?: Partial<Mollie.IMandate>) {
    super(props);

    const defaults: Mollie.IMandate = {
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
    return this.status === Mollie.Mandate.Status.valid;
  }
}
