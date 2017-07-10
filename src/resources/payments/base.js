import Resource from '../base';

/**
 * Payments base resource
 * @private
 */
export default class PaymentsResource extends Resource {
  /**
   * Set the parent
   * @param {Object} params
   * @since 2.0.0
   */
  setParent(params = {}) {
    if (!params.paymentId && !this.hasParentId()) {
      throw TypeError('Missing parameter "paymentId".');
    } else if (params.paymentId) {
      this.setParentId(params.paymentId);
    }
  }
}
