import { ListParameters } from './parameters';
import { SubscriptionData } from '../../data/subscription/data';
import Callback from '../../types/Callback';
import Subscription, { injectPrototypes } from '../../data/subscription/Subscription';
import List from '../../data/list/List';
import ParentedResource from '../ParentedResource';
import renege from '../../plumbing/renege';

/**
 * The `subscriptions` resource
 *
 * @since 3.2.0
 */
export default class SubscriptionsResource extends ParentedResource<SubscriptionData, Subscription> {
  protected getResourceUrl(): string {
    return 'subscriptions';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieves all subscriptions, ordered from newest to oldest.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters?: ListParameters): Promise<List<Subscription>>;
  public list(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
