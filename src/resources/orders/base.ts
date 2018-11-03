import Resource from '../../resource';

/**
 * Orders base resource
 * @private
 */
export default class OrdersResource extends Resource {
  /**
   * Set the parent
   * @since 2.0.0
   */
  setParent(params: any = {}) {
    if (!params.orderId && !this.hasParentId()) {
      throw TypeError('Missing parameter "orderId".');
    } else if (params.orderId) {
      this.setParentId(params.orderId);
    }
  }
}
