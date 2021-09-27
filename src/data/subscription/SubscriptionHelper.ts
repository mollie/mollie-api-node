import { SubscriptionData, SubscriptionStatus } from './data';
import Helper from '../Helper';
import Subscription from './Subscription';

export default class SubscriptionHelper extends Helper<SubscriptionData, Subscription> {
  /**
   * Returns the URL Mollie will call as soon a payment status change takes place.
   */
  public getWebhookUrl(this: SubscriptionData): string {
    return this.webhookUrl;
  }

  public isActive(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.active;
  }

  public isPending(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.pending;
  }

  public isCompleted(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.completed;
  }

  public isSuspended(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.suspended;
  }

  public isCanceled(this: SubscriptionData): boolean {
    return SubscriptionStatus.canceled == this.status;
  }
}
