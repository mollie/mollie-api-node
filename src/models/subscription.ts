import Model from '../model';

/**
 * The `Subscription` model
 */
export default class Subscription extends Model {
  webhookUrl: string;
  status: Mollie.SubscriptionStatus;
  canceledAt: string;
  static STATUS_ACTIVE = 'active';
  static STATUS_PENDING = 'pending'; // Waiting for a valid mandate.
  static STATUS_CANCELED = 'canceled';
  static STATUS_SUSPENDED = 'suspended'; // Active, but mandate became invalid.
  static STATUS_COMPLETED = 'completed';

  constructor(props?: Partial<Mollie.SubscriptionResponse>) {
    super(props);

    const defaults: Mollie.SubscriptionResponse = {
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
    return this.status === Subscription.STATUS_ACTIVE;
  }

  /**
   * If the subscription is pending
   * @returns {boolean}
   */
  isPending() {
    return this.status === Subscription.STATUS_PENDING;
  }

  /**
   * If the subscription is completed
   * @returns {boolean}
   */
  isCompleted() {
    return this.status === Subscription.STATUS_COMPLETED;
  }

  /**
   * If the subscription is suspended
   * @returns {boolean}
   */
  isSuspended() {
    return this.status === Subscription.STATUS_SUSPENDED;
  }

  /**
   * If the subscription is canceled
   * @returns {boolean}
   */
  isCanceled() {
    return !!this.canceledAt;
  }
}
