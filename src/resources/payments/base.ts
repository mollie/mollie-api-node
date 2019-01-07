import { startsWith } from 'lodash';

import Resource from '../../resource';
import Payment from '../../models/Payment';

import InvalidArgumentException from '../../exceptions/InvalidArgumentException';

/**
 * Payments base resource
 */
export default class PaymentsBaseResource extends Resource {
  protected setParentId(parentId: string) {
    if (!startsWith(parentId, Payment.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Payment ID given');
    }
    super.setParentId(parentId);
  }

  /**
   * Set the parent
   *
   * @since 2.0.0
   *
   * @deprecated 2.2.0 Please use setParentId instead
   */
  protected setParent(params: any = {}) {
    if (!params.paymentId && !this.hasParentId()) {
      throw TypeError('Missing parameter "paymentId".');
    } else if (params.paymentId) {
      this.setParentId(params.paymentId);
    }
  }
}
