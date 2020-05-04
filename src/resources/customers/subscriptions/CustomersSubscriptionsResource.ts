import { CancelParameters, CreateParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';
import { SubscriptionData } from '../../../data/subscription/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import Subscription, { injectPrototypes } from '../../../data/subscription/Subscription';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

/**
 * The `customers_subscriptions` resource.
 *
 * @since 1.3.2
 */
export default class CustomersSubscriptionsResource extends ParentedResource<SubscriptionData, Subscription> {
  protected getResourceUrl(customerId: string): string {
    return `customers/${customerId}/subscriptions`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Delete a customer subscription.
   *
   * @since 1.3.2
   *
   * @alias cancel
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public delete: CustomersSubscriptionsResource['cancel'] = this.cancel;
  /**
   * List the Customer's Subscriptions.
   *
   * @since 1.3.2
   *
   * @alias list
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public all: CustomersSubscriptionsResource['list'] = this.list;
  /**
   * List the Customer's Subscriptions.
   *
   * @since 3.0.0
   *
   * @alias list
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public page: CustomersSubscriptionsResource['list'] = this.list;

  /**
   * Create a customer subscription.
   *
   * @param params - Create Subscription parameters
   *
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Customer Subscription
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public create(parameters: CreateParameters): Promise<Subscription>;
  public create(parameters: CreateParameters, callback: Callback<Subscription>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.network.post(this.getResourceUrl(customerId), data);
  }

  /**
   * Get a customer subscription.
   *
   * @param id - Subscription ID
   * @param params - Get Subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @return Customer Subscription
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters: GetParameters): Promise<Subscription>;
  public get(id: string, parameters: GetParameters, callback: Callback<Subscription>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.get(`${this.getResourceUrl(customerId)}/${id}`, query);
  }

  /**
   * Get all customer's subscriptions.
   *
   * @param params - List customer's subscriptions parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found subscriptions
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Subscription>>;
  public list(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.list(this.getResourceUrl(customerId), 'subscriptions', query).then(result => this.injectPaginationHelpers(result, this.list, parameters || {}));
  }

  /**
   * Update a customer's subscription.
   *
   * @param id - Subscription ID
   * @param params - Update customer subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Customer Subscription object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public update(id: string, parameters: UpdateParameters): Promise<Subscription>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Subscription>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.network.patch(`${this.getResourceUrl(customerId)}/${id}`, data);
  }

  /**
   * Cancel a Subscription
   *
   * @param id - Subscription ID
   * @param params - Delete Subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public cancel(id: string, parameters: CancelParameters): Promise<Subscription>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Subscription>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.delete<Subscription>(`${this.getResourceUrl(customerId)}/${id}`);
  }
}
