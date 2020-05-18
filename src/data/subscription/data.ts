import { Amount, ApiMode, Links, Url } from '../global';
import Model from '../Model';

/**
 * Subscription Response object.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
 */
export interface SubscriptionData extends Model<'subscription'> {
  mode: ApiMode;
  status: SubscriptionStatus;
  amount: Amount;
  times: number;
  timesRemaining: number;
  interval: string;
  startDate: string;
  nextPaymentDate?: string;
  description: string;
  method: string;
  mandateId?: string;
  createdAt?: string;
  canceledAt: string;
  webhookUrl: string;
  metadata: any;
  _links: SubscriptionLinks;
}

/**
 * Subscription _links object
 *
 * @param customer - The API resource URL of the customer the subscription is for.
 */
export interface SubscriptionLinks extends Links {
  customer: Url;
  /**
   * The API resource URL of the website profile on which this subscription was created.
   */
  profile?: Url;
  /**
   * The API resource URL of the payments that are created by this subscription. Not present if no payments yet
   * created.
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
