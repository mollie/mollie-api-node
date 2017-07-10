import Model from './base';

/**
 * The `Subscription` model
 */
export default class Subscription extends Model {
  static STATUS_ACTIVE = 'active';
  static STATUS_PENDING = 'pending'; // Waiting for a valid mandate.
  static STATUS_CANCELLED = 'cancelled';
  static STATUS_SUSPENDED = 'suspended'; // Active, but mandate became invalid.
  static STATUS_COMPLETED = 'completed';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'subscription',
      id: null,
      customerId: null,
      mode: null,
      createdDatetime: null,
      status: null,
      amount: null,
      times: null,
      interval: null,
      description: null,
      method: null,
      cancelledDatetime: null,
      links: {
        webhookUrl: null,
      },
    };

    Object.assign(this, defaults, props);
  }

  /**
   * Get the webhook url
   * @returns {boolean|string}
   */
  getWebhookUrl() {
    return this.links && this.links.webhookUrl;
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
   * If the subscription is cancelled
   * @returns {boolean}
   */
  isCanceled() {
    return !!this.cancelledDatetime;
  }
}
