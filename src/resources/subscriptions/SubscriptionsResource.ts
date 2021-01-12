import { ListParameters } from './parameters';
import { SubscriptionData } from '../../data/subscription/data';
import Callback from '../../types/Callback';
import Subscription, { injectPrototypes } from '../../data/subscription/Subscription';
import List from '../../data/list/List';
import NetworkClient from '../../NetworkClient';
import ParentedResource from '../ParentedResource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class SubscriptionsResource extends ParentedResource<SubscriptionData, Subscription> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'subscriptions';
  }

  /**
   * Retrieves all subscriptions, ordered from newest to oldest.
   *
   * @since 3.2.0
   */
  public list(parameters?: ListParameters): Promise<List<Subscription>>;
  public list(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
