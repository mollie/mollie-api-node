import CustomersBaseResource from '../../../resources/customers/base';

/**
 * Customers base resource.
 */
export default class CustomersSubscriptionsBaseResource extends CustomersBaseResource {
  public static resource = 'customers_subscriptions';
  protected subscriptionId: string;

  /**
   * If the subscription ID is set
   *
   * @since 2.2.0
   */
  protected hasSubscriptionId(): boolean {
    return !!this.subscriptionId;
  }

  /**
   * @param subscriptionId - Subscription ID
   *
   * @since 2.2.0
   */
  protected setSubscriptionId(subscriptionId: string) {
    this.subscriptionId = subscriptionId;
  }

  /**
   * Create a resource URL with the parent ID.
   *
   * @since 2.0.0
   */
  protected getResourceUrl(): string {
    if ((this.constructor as any).resource.indexOf('_') !== -1) {
      const parts = (this.constructor as any).resource.split('_');

      if (parts.length >= 3) {
        return `${parts[0]}/${this.parentId}/${parts[1]}/${this.subscriptionId}/${parts[2]}`;
      }

      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }

    return (this.constructor as any).resource;
  }
}
