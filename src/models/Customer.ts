import Model from '../model';
import { ICustomer } from '../types/customer';

/**
 * The `Customer` model
 *
 * {@link ICustomer}
 */
export default class Customer extends Model implements ICustomer {
  public static resourcePrefix = 'cst_';

  public resource = 'customer';
  public id = null;
  public mode = null;
  public name = null;
  public email = null;
  public locale = null;
  public metadata = null;
  public recentlyUsedMethods = null;
  public createdAt = null;
  public _links = {
    self: null,
    documentation: null,
    mandates: null,
    subscriptions: null,
    payments: null,
  };

  // Access token parameters
  public testmode?: boolean;

  /**
   * Customer constructor
   *
   * @public ✓ This method is part of the public API
   */
  public constructor(props?: Partial<ICustomer>) {
    super();

    Object.assign(this, props);
  }
}
