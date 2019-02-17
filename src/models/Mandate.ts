import Model from '@root/model';
import { IMandate, MandateStatus } from '@mollie-types/mandate';

/**
 * The `Mandate` model
 *
 * {@link IMandate}
 */
export default class Mandate extends Model implements IMandate {
  public static resourcePrefix = 'mdt_';

  public resource = 'mandate';
  public id = null;
  public status = null;
  public method = null;
  public details = null;
  public mode = null;
  public mandateReference = null;
  public signatureDate = null;
  public createdAt = null;
  public _links = {
    self: null,
    documentation: null,
    customer: null,
  };

  // Access token parameters
  public testmode?: boolean;

  /**
   * Mandate constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IMandate>) {
    super();

    Object.assign(this, props);
  }

  /**
   * If the mandate is valid
   *
   * @public ✓ This method is part of the public API
   */
  public isValid(): boolean {
    return this.status === MandateStatus.valid;
  }
}
