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
   * Retrieve all subscriptions, ordered from newest to oldest. By using an API key all the subscriptions created with the current website profile will be returned. In the case of an OAuth Access
   * Token relies the website profile on the `profileId` field. All subscriptions of the merchant will be returned if you do not provide it.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions
   */
  public list(parameters?: ListParameters): Promise<List<Subscription>>;
  public list(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
