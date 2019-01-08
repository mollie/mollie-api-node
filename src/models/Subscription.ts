import Model from '../model';
import { ApiMode, IAmount, ILinks } from '../types/global';
import { ISubscription, SubscriptionStatus } from '../types/subscription';

/**
 * The `Subscription` model
 */
export default class Subscription extends Model implements ISubscription {
  public static resourcePrefix = 'sub_';
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
  _links: ILinks;

  // Access token parameters
  testmode?: boolean;

  constructor(props?: Partial<ISubscription>) {
    super(props);

    const defaults: ISubscription = {
      resource: 'subscription',
      id: null,
      mode: null,
      createdAt: null,
      status: null,
      amount: {
        currency: null,
        value: null,
      },
      times: null,
      interval: null,
      startDate: null,
      description: null,
      method: null,
      canceledAt: null,
      webhookUrl: null,
      timesRemaining: null,
      metadata: null,
      _links: {
        customer: null,
      },
    };

    Object.assign(this, defaults, props);
  }

  /**
   * Get the webhook url
   */
  getWebhookUrl(): string | boolean {
    return this.webhookUrl;
  }

  /**
   * If the subscription is active
   * @returns {boolean}
   */
  isActive(): boolean {
    return this.status === SubscriptionStatus.active;
  }

  /**
   * If the subscription is pending
   */
  isPending(): boolean {
    return this.status === SubscriptionStatus.pending;
  }

  /**
   * If the subscription is completed
   */
  isCompleted(): boolean {
    return this.status === SubscriptionStatus.completed;
  }

  /**
   * If the subscription is suspended
   */
  isSuspended(): boolean {
    return this.status === SubscriptionStatus.suspended;
  }

  /**
   * If the subscription is canceled
   */
  isCanceled(): boolean {
    return !!this.canceledAt;
  }
}
