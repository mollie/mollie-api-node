import Model from '../model';

/**
 * The `Subscription` model
 */
export default class Subscription extends Model implements Mollie.ISubscription {
  public static resourcePrefix = 'sub_';
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  status: Mollie.SubscriptionStatus;
  amount: Mollie.IAmount;
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
  _links: Mollie.ILinks;

  // Access token parameters
  testmode?: boolean;

  constructor(props?: Partial<Mollie.ISubscription>) {
    super(props);

    const defaults: Mollie.ISubscription = {
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
   * @returns {boolean|string}
   */
  getWebhookUrl() {
    return this.webhookUrl;
  }

  /**
   * If the subscription is active
   * @returns {boolean}
   */
  isActive() {
    return this.status === Mollie.SubscriptionStatus.active;
  }

  /**
   * If the subscription is pending
   * @returns {boolean}
   */
  isPending() {
    return this.status === Mollie.SubscriptionStatus.pending;
  }

  /**
   * If the subscription is completed
   * @returns {boolean}
   */
  isCompleted() {
    return this.status === Mollie.SubscriptionStatus.completed;
  }

  /**
   * If the subscription is suspended
   * @returns {boolean}
   */
  isSuspended() {
    return this.status === Mollie.SubscriptionStatus.suspended;
  }

  /**
   * If the subscription is canceled
   * @returns {boolean}
   */
  isCanceled() {
    return !!this.canceledAt;
  }
}
