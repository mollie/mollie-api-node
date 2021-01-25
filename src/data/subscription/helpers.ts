import { SubscriptionData, SubscriptionStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Returns the URL Mollie will call as soon a payment status change takes place.
   */
  getWebhookUrl: function getWebhookUrl(this: SubscriptionData): string {
    return this.webhookUrl;
  },

  isActive: function isActive(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.active;
  },

  isPending: function isPending(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.pending;
  },

  isCompleted: function isCompleted(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.completed;
  },

  isSuspended: function isSuspended(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.suspended;
  },

  isCanceled: function isCanceled(this: SubscriptionData): boolean {
    return SubscriptionStatus.canceled == this.status;
  },
};
