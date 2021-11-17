import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Helper from '../Helper';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import { SubscriptionData } from '../subscription/data';
import Subscription from '../subscription/Subscription';
import Customer, { CustomerData } from './Customer';
import { MandateData } from './mandates/data';
import Mandate from './mandates/Mandate';

export default class CustomerHelper extends Helper<CustomerData, Customer> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: CustomerData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the mandates belonging to the customer.
   *
   * @since 3.6.0
   */
  public getMandates(): Promise<Array<Mandate>>;
  public getMandates(callback: Callback<Array<Mandate>>): void;
  public getMandates() {
    if (renege(this, this.getMandates, ...arguments)) return;
    if (this.links.mandates == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<MandateData, Mandate>(this.links.mandates.href, 'mandates');
  }

  /**
   * Returns the subscriptions belonging to the customer.
   *
   * @since 3.6.0
   */
  public getSubscriptions(): Promise<Array<Subscription>>;
  public getSubscriptions(callback: Callback<Array<Subscription>>): void;
  public getSubscriptions() {
    if (renege(this, this.getSubscriptions, ...arguments)) return;
    if (this.links.subscriptions == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<SubscriptionData, Subscription>(this.links.subscriptions.href, 'subscriptions');
  }

  /**
   * Returns the payments belonging to the customer.
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
