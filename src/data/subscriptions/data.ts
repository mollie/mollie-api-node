import { Amount, ApiMode, Links, Url } from '../global';
import Model from '../Model';

export interface SubscriptionData extends Model<'subscription'> {
  /**
   * The mode used to create this subscription. Mode determines whether the subscription's payments are real or test payments.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=mode#response
   */
  mode: ApiMode;
  /**
   * The subscription's current status, depends on whether the customer has a pending, valid or invalid mandate.
   *
   * Possible values: `pending` `active` `canceled` `suspended` `completed`
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=status#response
   */
  status: SubscriptionStatus;
  /**
   * The constant amount that is charged with each subscription payment, e.g. `{"currency":"EUR", "value":"10.00"}` for a €10.00 subscription.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=amount#response
   */
  amount: Amount;
  /**
   * Total number of charges for the subscription to complete.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=times#response
   */
  times: number;
  /**
   * Number of charges left for the subscription to complete.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=timesRemaining#response
   */
  timesRemaining: number;
  /**
   * Interval to wait between charges, for example `1 month` or `14 days`.
   *
   * Possible values: `... months` `... weeks` `... days`
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=interval#response
   */
  interval: string;
  /**
   * The start date of the subscription in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=startDate#response
   */
  startDate: string;
  /**
   * The date of the next scheduled payment in `YYYY-MM-DD` format. When there will be no next payment, for example when the subscription has ended, this parameter will not be returned.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=nextPaymentDate#response
   */
  nextPaymentDate?: string;
  /**
   * The description specified during subscription creation. This will be included in the payment description.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=description#response
   */
  description: string;
  /**
   * The payment method used for this subscription, either forced on creation or `null` if any of the customer's valid mandates may be used.
   *
   * Possible values: `creditcard` `directdebit` `paypal` `null`
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=method#response
   */
  method: string | null;
  /**
   * The mandate used for this subscription. When there is no mandate specified, this parameter will not be returned.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=mandateId#response
   */
  mandateId?: string;
  /**
   * The subscription's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=createdAt#response
   */
  createdAt: string;
  /**
   * The subscription's date and time of cancellation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment is not canceled (yet).
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=canceledAt#response
   */
  canceledAt?: string;
  /**
   * The URL Mollie will call as soon a payment status change takes place.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=webhookUrl#response
   */
  webhookUrl: string;
  /**
   * The optional metadata you provided upon subscription creation. Metadata can for example be used to link a plan to a subscription.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=metadata#response
   */
  metadata: any;
  /**
   * The application fee, if the subscription was created with one. This will be applied on each payment created for the subscription.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=applicationFee#response
   */
  applicationFee?: Amount;
  /**
   * An object with several URL objects relevant to the subscription. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=_links#response
   */
  _links: SubscriptionLinks;
}

export interface SubscriptionLinks extends Links {
  /**
   * The API resource URL of the customer the subscription is for.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=_links/customer#response
   */
  customer: Url;
  /**
   * The API resource URL of the website profile on which this subscription was created.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=_links/profile#response
   */
  profile?: Url;
  /**
   * The API resource URL of the payments that are created by this subscription. Not present if no payments yet created.
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription?path=_links/payments#response
   */
  payments?: Url;
}

export enum SubscriptionStatus {
  pending = 'pending',
  active = 'active',
  canceled = 'canceled',
  suspended = 'suspended',
  completed = 'completed',
}
