import { runIf } from 'ruply';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import renege from '../../plumbing/renege';
import undefinedPromise from '../../plumbing/undefinedPromise';
import Callback from '../../types/Callback';
import Maybe from '../../types/Maybe';
import { ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import Customer, { CustomerData } from '../customers/Customer';
import Payment from '../payments/Payment';
import { PaymentData } from '../payments/data';
import Profile from '../profiles/Profile';
import { ProfileData } from '../profiles/data';
import Subscription from './Subscription';
import { SubscriptionData, SubscriptionStatus } from './data';

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

  /**
   * @deprecated Use `subscription.status == SubscriptionStatus.active` instead.
   */
  public isActive(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.active;
  }

  /**
   * @deprecated Use `subscription.status == SubscriptionStatus.pending` instead.
   */
  public isPending(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.pending;
  }

  /**
   * @deprecated Use `subscription.status == SubscriptionStatus.completed` instead.
   */
  public isCompleted(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.completed;
  }

  /**
   * @deprecated Use `subscription.status == SubscriptionStatus.suspended` instead.
   */
  public isSuspended(this: SubscriptionData): boolean {
    return this.status === SubscriptionStatus.suspended;
  }

  /**
   * @deprecated Use `subscription.status == SubscriptionStatus.canceled` instead.
   */
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
    return runIf(this.links.profile, ({ href }) => this.networkClient.get<ProfileData, Profile>(href)) ?? undefinedPromise;
  }

  /**
   * Returns the payments that are created by this subscription.
   *
   * @since 3.6.0
   */
  public getPayments(parameters?: ThrottlingParameter): HelpfulIterator<Payment> {
    return runIf(this.links.payments, ({ href }) => this.networkClient.iterate<PaymentData, Payment>(href, 'payments', undefined, parameters?.valuesPerMinute)) ?? emptyHelpfulIterator;
  }
}
