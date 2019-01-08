import Model from '../model';
import { ICustomer } from '../types/customer';
import { ApiMode, ILinks, Locale, PaymentMethod } from '../types/global';

/**
 * The `Customer` model
 */
export default class Customer extends Model implements ICustomer {
  public static resourcePrefix = 'cst_';
  public resource: string;
  public id: string;
  public mode: ApiMode;
  public name: string;
  public email: string;
  public locale: Locale;
  public recentlyUsedMethods: Array<PaymentMethod>;
  public metadata: any;
  public createdAt: string;
  public _links: ILinks;

  // Access token parameters
  public testmode?: boolean;

  constructor(props?: Partial<ICustomer>) {
    super(props);

    const defaults: ICustomer = {
      resource: 'customer',
      id: null,
      mode: null,
      name: null,
      email: null,
      locale: null,
      metadata: null,
      recentlyUsedMethods: null,
      createdAt: null,
      _links: {
        mandates: null,
        subscriptions: null,
        payments: null,
      },
    };

    Object.assign(this, defaults, props);
  }
}
