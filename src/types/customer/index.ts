import { ApiMode, ILinks, Locale, PaymentMethod } from '../global';

/**
 * Customer Response object.
 *
 * @see
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
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;
}
