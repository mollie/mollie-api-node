import List from '../../data/list/List';
import { SubscriptionData } from '../../data/subscription/data';
import Subscription from '../../data/subscription/Subscription';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Callback from '../../types/Callback';
import InnerBinder from '../InnerBinder';
import { ListParameters } from './parameters';

const pathSegment = 'subscriptions';

export default class SubscriptionsBinder extends InnerBinder<SubscriptionData, Subscription> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all subscriptions, ordered from newest to oldest. By using an API key all the subscriptions created with the current website profile will be returned. In the case of an OAuth Access
   * Token relies the website profile on the `profileId` field. All subscriptions of the merchant will be returned if you do not provide it.
   *
   * @since 3.2.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions
   */
  public list: SubscriptionsBinder['page'] = this.page;

  /**
   * Retrieve all subscriptions, ordered from newest to oldest. By using an API key all the subscriptions created with the current website profile will be returned. In the case of an OAuth Access
   * Token relies the website profile on the `profileId` field. All subscriptions of the merchant will be returned if you do not provide it.
   *
   * @since 3.2.0 (as `list`)
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions
   */
  public page(parameters?: ListParameters): Promise<List<Subscription>>;
  public page(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public page(parameters: ListParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.list<SubscriptionData, Subscription>(pathSegment, 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }
}
