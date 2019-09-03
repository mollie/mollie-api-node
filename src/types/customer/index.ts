import { ApiMode, ILinks, IUrl, Locale, PaymentMethod } from '../global';

/**
 * Customer Response object.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
export interface ICustomer {
  resource: string;
  id: string;
  mode: ApiMode;
  name: string;
  email: string;
  locale: Locale;
  recentlyUsedMethods: PaymentMethod[];
  metadata: Record<string, string>;
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
