import Resource from '../../resource';

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
      throw new TypeError('Missing parameter "customerId".');
    } else if (params.customerId) {
      this.setParentId(params.customerId);
    }
  }

  /**
   * Set Parent ID
   *
   * @param parentId - Parent resource ID
   *
   * @since 2.2.0
   */
  protected setParentId(parentId: string): void {
    super.setParentId(parentId);
  }
}
