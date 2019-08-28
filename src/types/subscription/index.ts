import { ApiMode, IAmount, ILinks, IUrl } from '../global';

/**
 * Subscription Response object.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
 */
export interface ISubscription {
  resource: string;
  id: string;
  mode: ApiMode;
  status: SubscriptionStatus;
  amount: IAmount;
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
  _links: ISubscriptionLinks;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Subscription _links object
 *
 * @param customer - The API resource URL of the customer the subscription is for.
 */
export interface ISubscriptionLinks extends ILinks {
  customer: IUrl;
}

export enum SubscriptionStatus {
  pending = 'pending',
  active = 'active',
  canceled = 'canceled',
  suspended = 'suspended',
  completed = 'completed',
}
