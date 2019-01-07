import CustomersBaseResource from './base';
import Subscription from '../../../models/Subscription';
import List from '../../../models/List';

/**
 * The `customers_subscriptions` resource.
 *
 * @static {string} resource
 * @static {Object} model
 * @static {string} apiName
 *
 * @since 1.3.2
 */
export default class CustomersSubscriptionsResource extends CustomersBaseResource {
  public static resource = 'customers_subscriptions';
  public static model = Subscription;
  public static apiName = 'Subscriptions API';

  /**
   * Create a customer subscription.
   *
   * @param {Mollie.Subscription.Params.ICreate}  params
   * @param {Mollie.Subscription.Callback.Create} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Subscription>}
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
   * @public ✓ This method is part of the public API
   */
  public async create(
    params: Mollie.Subscription.Params.ICreate,
    cb?: Mollie.Subscription.Callback.Create,
  ): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get a customer subscription.
   *
   * @param {string}                           id     Subscription ID
   * @param {Mollie.Subscription.Params.IGet}  params
   * @param {Mollie.Subscription.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @return {Promise<Customer>}
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
   * @public ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params: Mollie.Subscription.Params.IGet,
    cb?: Mollie.Subscription.Callback.Get,
  ): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.get(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get all customer's subscriptions.
   *
   * @param {Mollie.Subscription.Params.IList}  params
   * @param {Mollie.Subscription.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Subscription>>}
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   * @public ✓ This method is part of the public API
   */
  public async list(
    params?: Mollie.Subscription.Params.IList,
    cb?: Mollie.Subscription.Callback.List,
  ): Promise<List<Subscription>> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Subscription>>;
  }

  /**
   * Update a Customer's Subscription.
   *
   * @param {string}                              id     Subscription ID
   * @param {Mollie.Subscription.Params.IUpdate}  params
   * @param {Mollie.Subscription.Callback.Update} cb     Callback function, can be used instead of the returned `Promise` object
   * @returns {Promise<Model>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
   * @public ✓ This method is part of the public API
   */
  public async update(
    id: string,
    params: Mollie.Subscription.Params.IUpdate,
    cb?: Mollie.Subscription.Callback.Update,
  ): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.update(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Alias for delete.
   *
   * @param {string}                              id     Subscription ID
   * @param {Mollie.Subscription.Params.ICancel}  params
   * @param {Mollie.Subscription.Callback.Cancel} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   * @public ✓ This method is part of the public API
   */
  public async cancel(
    id: string,
    params?: Mollie.Subscription.Params.ICancel,
    cb?: Mollie.Subscription.Callback.Cancel,
  ): Promise<boolean> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    // TODO: check return type
    return super.delete(id, parameters, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * Delete a customer subscription.
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   * @public ✓ This method is part of the public API
   */
  delete = this.cancel;

  /**
   * List the Customer's Subscriptions.
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   * @public ✓ This method is part of the public API
   */
  all = this.list;
}
