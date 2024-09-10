import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Helper from '../../Helper';
import type Customer from '../Customer';
import { type CustomerData } from '../Customer';
import { MandateStatus, type MandateData } from './data';
import type Mandate from './Mandate';

export default class MandateHelper extends Helper<MandateData, Mandate> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: MandateData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the payments belonging to the customer.
   *
   * @since 3.6.0
   */
  public getCustomer(): Promise<Customer>;
  public getCustomer(callback: Callback<Customer>): void;
  public getCustomer() {
    if (renege(this, this.getCustomer, ...arguments)) return;
    return this.networkClient.get<CustomerData, Customer>(this.links.customer.href);
  }
}
