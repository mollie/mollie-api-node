import MollieResource from 'mollie-resource';

/**
 * Customers base resource
 * @private
 */
export default class CustomersResource extends MollieResource {
  /**
   * Set the parent
   * @param {Object} params
   * @since 2.0.0
   */
  setParent(params = {}) {
    if (!params.customerId && !this.hasParentId()) {
      throw TypeError('Missing parameter "customerId".');
    } else if (params.customerId) {
      this.setParentId(params.customerId);
    }
  }
}
