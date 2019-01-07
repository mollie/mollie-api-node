import Model from '../model';

/**
 * The `Customer` model
 */
export default class Customer extends Model implements Mollie.ICustomer {
  public static resourcePrefix = 'cst_';
  public resource: string;
  public id: string;
  public mode: Mollie.ApiMode;
  public name: string;
  public email: string;
  public locale: Mollie.Locale;
  public recentlyUsedMethods: Array<Mollie.Method>;
  public metadata: any;
  public createdAt: string;
  public _links: Mollie.ILinks;

  // Access token parameters
  public testmode?: boolean;

  constructor(props?: Partial<Mollie.ICustomer>) {
    super(props);

    const defaults: Mollie.ICustomer = {
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
