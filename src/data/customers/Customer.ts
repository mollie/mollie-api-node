import { ApiMode, Links, Url, Locale, PaymentMethod } from '../global';
import Model from '../Model';
import commonHelpers from '../commonHelpers';
import Seal from '../../types/Seal';

/**
 * Customer Response object.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
export interface CustomerData extends Model<'customer'> {
  mode: ApiMode;
  name: string;
  email: string;
  locale: Locale;
  recentlyUsedMethods: PaymentMethod[];
  metadata: Record<string, string>;
  createdAt: string;
  _links: CustomerLinks;
}

type Customer = Seal<CustomerData, typeof commonHelpers>;

export default Customer;

/**
 * Customer _links object
 *
 * @param mandates - Mandates list
 * @param subscriptions - Subscriptions list
 * @param payments - Payments list
 */
export interface CustomerLinks extends Links {
  mandates: Url;
  subscriptions: Url;
  payments: Url;
}

export function injectPrototypes(input: CustomerData): Customer {
  return Object.assign(Object.create(commonHelpers), input);
}
