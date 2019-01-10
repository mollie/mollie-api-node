import Resource from '../../resource';

/**
 * Payments base resource
 */
export default class PaymentsBaseResource extends Resource {
  protected setParentId(parentId: string) {
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
