import { ListParameters } from './parameters';
import { SubscriptionData } from '../../data/subscription/data';
import Callback from '../../types/Callback';
import Subscription, { injectPrototypes } from '../../data/subscription/Subscription';
import List from '../../data/list/List';
import ParentedResource from '../ParentedResource';
import renege from '../../plumbing/renege';

export default class SubscriptionsResource extends ParentedResource<SubscriptionData, Subscription> {
  protected getResourceUrl(): string {
    return 'subscriptions';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieves all subscriptions, ordered from newest to oldest.
   *
   * @since 3.2.0
   */
  public list(parameters?: ListParameters): Promise<List<Subscription>>;
  public list(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
