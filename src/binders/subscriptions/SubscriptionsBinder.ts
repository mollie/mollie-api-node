import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Page from '../../data/page/Page';
import { type SubscriptionData } from '../../data/subscriptions/data';
import type Subscription from '../../data/subscriptions/Subscription';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'subscriptions';

export default class SubscriptionsBinder extends Binder<SubscriptionData, Subscription> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all subscriptions, ordered from newest to oldest. By using an API key all the subscriptions created with the current website profile will be returned. In the case of an OAuth Access
   * Token relies the website profile on the `profileId` field. All subscriptions of the merchant will be returned if you do not provide it.
   *
   * @since 3.2.0 (as `list`)
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-all-subscriptions
   */
  public page(parameters?: PageParameters): Promise<Page<Subscription>>;
  public page(parameters: PageParameters, callback: Callback<Page<Subscription>>): void;
  public page(parameters?: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<SubscriptionData, Subscription>(pathSegment, 'subscriptions', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all subscriptions, ordered from newest to oldest. By using an API key all the subscriptions created with the current website profile will be returned. In the case of an OAuth Access
   * Token relies the website profile on the `profileId` field. All subscriptions of the merchant will be returned if you do not provide it.
   *
   * @since 3.6.0
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<SubscriptionData, Subscription>(pathSegment, 'subscriptions', query, valuesPerMinute);
  }
}
