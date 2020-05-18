import { SubscriptionData, SubscriptionStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Get the webhook url
   */
  getWebhookUrl: function getWebhookUrl(this: SubscriptionData): string {
    return this.webhookUrl;
  },

  /**
   * If the subscription is active
   */
  isActive: function isActive(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.active;
  },

  /**
   * If the subscription is pending
   */
  isPending: function isPending(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.pending;
  },

  /**
   * If the subscription is completed
   */
  isCompleted: function isCompleted(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.completed;
  },

  /**
   * If the subscription is suspended
   */
  isSuspended: function isSuspended(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.suspended;
  },

  /**
   * If the subscription is canceled
   */
  isCanceled: function isCanceled(this: SubscriptionData): boolean {
    return SubscriptionStatus.canceled == this.status;
  },
};
