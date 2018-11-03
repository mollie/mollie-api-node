import Model from '../model';

/**
 * The `Customer` model
 */
export default class Customer extends Model implements Mollie.CustomerResponse {
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  name: string;
  email: string;
  locale: Mollie.Locale;
  recentlyUsedMethods: Array<Mollie.Method>;
  metadata: any;
  createdAt: string;
  _links: Mollie.Links;

  // Access token parameters
  testmode?: boolean;

  constructor(props?: Partial<Mollie.CustomerResponse>) {
    super(props);

    const defaults: Mollie.CustomerResponse = {
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
