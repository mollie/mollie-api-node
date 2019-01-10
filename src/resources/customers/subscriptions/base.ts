import { startsWith } from 'lodash';

import Subscription from '../../../models/Subscription';
import CustomersBaseResource from '../../../resources/customers/base';

/**
 * Customers base resource.
 */
export default class CustomersSubscriptionsBaseResource extends CustomersBaseResource {
  public resource = 'customers_subscriptions';
  protected subscriptionId: string;

  /**
   * If the subscription ID is set
   *
   * @since 2.0.0
   */
  protected hasSubscriptionId(): boolean {
    return !!this.subscriptionId;
  }

  /**
   * @param subscriptionId - Subscription ID
   *
   * @since 2.2.0
   */
  protected setSubscriptionId(subscriptionId: string) {
    if (!startsWith(subscriptionId, Subscription.resourcePrefix)) {
      throw { error: { message: 'The subscription id is invalid' } };
    }

    this.subscriptionId = subscriptionId;
  }

  /**
   * Create a resource URL with the parent ID.
   *
   * @since 2.0.0
   */
  protected getResourceUrl(): string {
    if (this.resource.indexOf('_') !== -1) {
      const parts = this.resource.split('_');

      if (parts.length >= 3) {
        return `${parts[0]}/${this.parentId}/${parts[1]}/${this.subscriptionId}/${parts[2]}`;
      }

      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return this.resource;
  }
}
