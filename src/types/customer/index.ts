import { ApiMode, ILinks, IUrl, Locale, PaymentMethod } from '../global';

/**
 * Customer Response object.
 *
 * @see http://localhost:63342/api-documentation/build/html/reference/v2/customers-api/get-customer.html
 */
export interface ICustomer {
  resource: string;
  id: string;
  mode: ApiMode;
  name: string;
  email: string;
  locale: Locale;
  recentlyUsedMethods: Array<PaymentMethod>;
  metadata: any;
  createdAt: string;
  _links: ICustomerLinks;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Customer _links object
 *
 * @param mandates - Mandates list
 * @param subscriptions - Subscriptions list
 * @param payments - Payments list
 */
export interface ICustomerLinks extends ILinks {
  mandates: IUrl;
  subscriptions: IUrl;
  payments: IUrl;
}
