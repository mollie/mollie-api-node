import { startsWith } from 'lodash';

import Resource from '../../resource';
import Payment from '../../models/Payment';

/**
 * Payments base resource
 */
export default class PaymentsBaseResource extends Resource {
  protected setParentId(parentId: string) {
    if (!startsWith(parentId, Payment.resourcePrefix)) {
      throw { error: { message: 'The payment id is invalid' } };
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
