import { startsWith } from 'lodash';

import Resource from '../../resource';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';
import Customer from '../../models/Customer';

/**
 * Customers base resource.
 */
export default class CustomersBaseResource extends Resource {
  /**
   * Set the parent.
   *
   * @since 2.0.0
   *
   * @deprecated 2.2.0 Please use setParentId instead
   */
  protected setParent(params: any = {}): void {
    if (!params.customerId && !this.hasParentId()) {
      throw TypeError('Missing parameter "customerId".');
    } else if (params.customerId) {
      this.setParentId(params.customerId);
    }
  }

  /**
   * Set Parent ID
   *
   * @param {string} parentId
   *
   * @returns {void}
   *
   * @since 2.2.0
   */
  protected setParentId(parentId: string): void {
    if (!startsWith(parentId, Customer.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Customer ID given');
    }

    super.setParentId(parentId);
  }
}
