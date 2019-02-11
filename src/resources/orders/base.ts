import Resource from '../../resource';

/**
 * Orders base resource
 * @private
 */
export default class OrdersBaseResource extends Resource {
  /**
   * Set the parent
   * @since 2.0.0
   *
   * @deprecated 2.2.0 Please use setParentId instead
   */
  protected setParent(params: any = {}): void{
    if (!params.orderId && !this.hasParentId()) {
      throw new TypeError('Missing parameter "orderId".');
    } else if (params.orderId) {
      this.setParentId(params.orderId);
    }
  }
}
