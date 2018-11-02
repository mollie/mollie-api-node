import Resource from '../../resource';

/**
 * Payments base resource
 * @private
 */
export default class PaymentsResource extends Resource {
  /**
   * Set the parent
   * @since 2.0.0
   */
  setParent(params: any = {}) {
    if (!params.paymentId && !this.hasParentId()) {
      throw TypeError('Missing parameter "paymentId".');
    } else if (params.paymentId) {
      this.setParentId(params.paymentId);
    }
  }
}
