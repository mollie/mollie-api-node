import { SubscriptionData, SubscriptionStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Get the webhook url
   *
   * @public ✓ This method is part of the public API
   */
  getWebhookUrl: function getWebhookUrl(this: SubscriptionData): string {
    return this.webhookUrl;
  },

  /**
   * If the subscription is active
   *
   * @public ✓ This method is part of the public API
   */
  isActive: function isActive(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.active;
  },

  /**
   * If the subscription is pending
   *
   * @public ✓ This method is part of the public API
   */
  isPending: function isPending(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.pending;
  },

  /**
   * If the subscription is completed
   *
   * @public ✓ This method is part of the public API
   */
  isCompleted: function isCompleted(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.completed;
  },

  /**
   * If the subscription is suspended
   *
   * @public ✓ This method is part of the public API
   */
  isSuspended: function isSuspended(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.suspended;
  },

  /**
   * If the subscription is canceled
   *
   * @public ✓ This method is part of the public API
   */
  isCanceled: function isCanceled(this: SubscriptionData): boolean {
    return SubscriptionStatus.canceled == this.status;
  },
};
