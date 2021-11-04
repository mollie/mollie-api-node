import renege from '../../plumbing/renege';
import undefinedPromise from '../../plumbing/undefinedPromise';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Maybe from '../../types/Maybe';
import Customer, { CustomerData } from '../customers/Customer';
import Helper from '../Helper';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import { ProfileData } from '../profiles/data';
import Profile from '../profiles/Profile';
import { SubscriptionData, SubscriptionStatus } from './data';
import Subscription from './Subscription';

export default class SubscriptionHelper extends Helper<SubscriptionData, Subscription> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: SubscriptionData['_links']) {
    super(networkClient, links);
  }

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

  /**
   * Returns the customer the subscription is for.
   *
   * @since 3.6.0
   */
  public getCustomer(): Promise<Customer>;
  public getCustomer(callback: Callback<Customer>): void;
  public getCustomer() {
    if (renege(this, this.getCustomer, ...arguments)) return;
    return this.networkClient.get<CustomerData, Customer>(this.links.customer.href);
  }

  /**
   * Returns the website profile on which this subscription was created.
   *
   * @since 3.6.0
   */
  public getProfile(): Promise<Profile> | Promise<undefined>;
  public getProfile(callback: Callback<Maybe<Profile>>): void;
  public getProfile() {
    if (renege(this, this.getProfile, ...arguments)) return;
    if (this.links.profile == undefined) {
      return undefinedPromise;
    }
    return this.networkClient.get<ProfileData, Profile>(this.links.profile.href);
  }

  /**
   * Returns the payments that are created by this subscription.
   *
   * @since 3.6.0
   */
  public getPayments(): Promise<Array<Payment>>;
  public getPayments(callback: Callback<Array<Payment>>): void;
  public getPayments() {
    if (renege(this, this.getPayments, ...arguments)) return;
    if (this.links.payments == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<PaymentData, Payment>(this.links.payments.href, 'payments');
  }
}
