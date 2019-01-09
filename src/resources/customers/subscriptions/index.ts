import CustomersBaseResource from './base';
import Subscription from '../../../models/Subscription';
import List from '../../../models/List';
import {
  ICancelParams,
  ICreateParams,
  IGetParams,
  IListParams,
  IUpdateParams,
} from '../../../types/subscription/params';
import {
  CancelCallback,
  CreateCallback,
  GetCallback,
  ListCallback,
  UpdateCallback,
} from '../../../types/subscription/callback';

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

  // API METHODS

  /**
   * Create a customer subscription.
   *
   * @param params
   * @param cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get a customer subscription.
   *
   * @param id     Subscription ID
   * @param params
   * @param cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @return
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params: IGetParams, cb?: GetCallback): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.get(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get all customer's subscriptions.
   *
   * @param params - List Customer's Subscriptions parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Subscription>> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Subscription>>;
  }

  /**
   * Update a Customer's Subscription.
   *
   * @param id - Subscription ID
   * @param params - Update Customer Subscription parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Customer Subscription object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
   * @public ✓ This method is part of the public API
   */
  public async update(
    id: string,
    params: IUpdateParams,
    cb?: UpdateCallback,
  ): Promise<Subscription> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.update(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Cancel a Subscription
   *
   * @param id - Subscription ID
   * @param params - Delete Subscription parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<boolean> {
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
