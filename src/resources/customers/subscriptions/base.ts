import { startsWith } from 'lodash';

import InvalidArgumentException from '../../../exceptions/InvalidArgumentException';
import Subscription from '../../../models/Subscription';
import CustomersBaseResource from '../../../resources/customers/base';
import Resource from '../../../resource';

/**
 * Customers base resource.
 */
export default class CustomersSubscriptionsBaseResource extends CustomersBaseResource {
  protected subscriptionId: string;

  protected setSubscriptionId(subscriptionId: string) {
    if (!startsWith(subscriptionId, Subscription.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Subscription ID given');
    }

    super.setParentId(subscriptionId);
  }

  /**
   * Create a resource URL with the parent ID.
   *
   * @since 2.0.0
   */
  protected getResourceUrl(): string {
    if ((this.constructor as typeof Resource).model.resource.indexOf('_') !== -1) {
      const parts = (this.constructor as typeof Resource).model.resource.split('_');

      if (parts.length >= 3) {
        return `${parts[0]}/${this.parentId}/${parts[1]}/${this.subscriptionId}/${parts[2]}`;
      }

      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return (this.constructor as typeof Resource).model.resource;
  }
}
