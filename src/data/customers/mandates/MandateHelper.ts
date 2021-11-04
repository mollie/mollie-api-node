import { MandateData, MandateStatus } from './data';
import Helper from '../../Helper';
import Mandate from './Mandate';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import Customer, { CustomerData } from '../Customer';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';

export default class MandateHelper extends Helper<MandateData, Mandate> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: MandateData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the mandate is valid.
   */
  public isValid(this: MandateData): boolean {
    return this.status === MandateStatus.valid;
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
