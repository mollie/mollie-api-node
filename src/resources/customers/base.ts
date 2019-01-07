import { startsWith } from 'lodash';

import Resource from '../../resource';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';
import Customer from '../../models/Customer';

/**
 * Customers base resource
 */
export default class CustomersBaseResource extends Resource {
  /**
   * Set the parent
   * @since 2.0.0
   *
   * @deprecated 2.2.0 Please use setParentId instad
   */
  setParent(params: any = {}) {
    if (!params.customerId && !this.hasParentId()) {
      throw TypeError('Missing parameter "customerId".');
    } else if (params.customerId) {
      this.setParentId(params.customerId);
    }
  }

  protected setParentId(parentId: string) {
    if (!startsWith(parentId, Customer.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Customer ID given');
    }

    super.setParentId(parentId);
  }
}
