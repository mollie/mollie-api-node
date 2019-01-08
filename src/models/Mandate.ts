import Model from '../model';
import { ApiMode, ILinks } from '../types/global';
import { IMandate, IMandateDetails, MandateMethod, MandateStatus } from '../types/mandate';

/**
 * The `Mandate` model
 */
export default class Mandate extends Model implements IMandate {
  public static resourcePrefix = 'mdt_';
  resource: string;
  id: string;
  mode: ApiMode;
  status: MandateStatus;
  method: MandateMethod;
  details: IMandateDetails;
  mandateReference: string;
  signatureDate: string;
  createdAt: string;
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;

  constructor(props?: Partial<IMandate>) {
    super(props);

    const defaults: IMandate = {
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
    return this.status === MandateStatus.valid;
  }
}
