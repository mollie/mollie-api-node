import { runIf } from 'ruply';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import { ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import Payment from '../payments/Payment';
import { PaymentData } from '../payments/data';
import Subscription from '../subscriptions/Subscription';
import { SubscriptionData } from '../subscriptions/data';
import Customer, { CustomerData } from './Customer';
import Mandate from './mandates/Mandate';
import { MandateData } from './mandates/data';

export default class CustomerHelper extends Helper<CustomerData, Customer> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: CustomerData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the mandates belonging to the customer.
   *
   * @since 3.6.0
   */
  public getMandates(parameters?: ThrottlingParameter): HelpfulIterator<Mandate> {
    return runIf(this.links.mandates, ({ href }) => this.networkClient.iterate<MandateData, Mandate>(href, 'mandates', undefined, parameters?.valuesPerMinute)) ?? emptyHelpfulIterator;
  }

  /**
   * Returns the subscriptions belonging to the customer.
   *
   * @since 3.6.0
   */
  public getSubscriptions(parameters?: ThrottlingParameter): HelpfulIterator<Subscription> {
    return (
      runIf(this.links.subscriptions, ({ href }) => this.networkClient.iterate<SubscriptionData, Subscription>(href, 'subscriptions', undefined, parameters?.valuesPerMinute)) ?? emptyHelpfulIterator
    );
  }

  /**
   * Returns the payments belonging to the customer.
   *
   * @since 3.6.0
   */
  public getPayments(parameters?: ThrottlingParameter): HelpfulIterator<Payment> {
    return runIf(this.links.payments, ({ href }) => this.networkClient.iterate<PaymentData, Payment>(href, 'payments', undefined, parameters?.valuesPerMinute)) ?? emptyHelpfulIterator;
  }
}
