import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type ApiMode, type Links, type Locale, type PaymentMethod, type Url } from '../global';
import type Model from '../Model';
import CustomerHelper from './CustomerHelper';

export interface CustomerData extends Model<'customer'> {
  /**
   * The mode used to create this customer.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=mode#response
   */
  mode: ApiMode;
  /**
   * The full name of the customer as provided when the customer was created.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=name#response
   */
  name: string;
  /**
   * The email address of the customer as provided when the customer was created.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=email#response
   */
  email: string;
  /**
   * Allows you to preset the language to be used in the hosted payment pages shown to the consumer. If this parameter was not provided when the customer was created, the browser language will be used
   * instead in the payment flow (which is usually more accurate).
   *
   * Possible values: `en_US` `en_GB` `nl_NL` `nl_BE` `fr_FR` `fr_BE` `de_DE` `de_AT` `de_CH` `es_ES` `ca_ES` `pt_PT` `it_IT` `nb_NO` `sv_SE` `fi_FI` `da_DK` `is_IS` `hu_HU` `pl_PL` `lv_LV` `lt_LT`
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=locale#response
   */
  locale: Locale;
  recentlyUsedMethods: PaymentMethod[];
  /**
   * Data provided during the customer creation.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=metadata#response
   */
  metadata: Record<string, string>;
  /**
   * The customer's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the customer. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=_links#response
   */
  _links: CustomerLinks;
}

type Customer = Seal<CustomerData, CustomerHelper>;

export default Customer;

export interface CustomerLinks extends Links {
  /**
   * The API resource URL of the mandates belonging to the Customer, if there are no mandates this parameter is omitted.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=_links/mandates#response
   */
  mandates: Url;
  /**
   * The API resource URL of the subscriptions belonging to the Customer, if there are no subscriptions this parameter is omitted.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=_links/subscriptions#response
   */
  subscriptions: Url;
  /**
   * The API resource URL of the payments belonging to the Customer, if there are no payments this parameter is omitted.
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer?path=_links/payments#response
   */
  payments: Url;
}

export function transform(networkClient: TransformingNetworkClient, input: CustomerData): Customer {
  return Object.assign(Object.create(new CustomerHelper(networkClient, input._links)), input);
}
