import CustomersBaseResource from './base';
import Subscription from '../../../models/Subscription';
import List from '../../../models/List';
import Payment from '../../../models/Payment';
import ApiException from '../../../exceptions/ApiException';
import { IListParams } from '../../../types/subscription/payment/params';
import { ListCallback } from '../../../types/subscription/payment/callback';

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
  public static apiName = 'Subscriptions API (Payments section)';

  // API METHODS

  /**
   * Get all customer's subscriptions.
   *
   * @param params - List Customer's Subscriptions parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Subscriptions
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Payment>> {
    const { customerId, subscriptionId, ...parameters } = params;
    this.setParentId(customerId);
    this.setSubscriptionId(subscriptionId);

    return super.list(parameters, cb) as Promise<List<Payment>>;
  }

  // ALIASES

  /**
   * Get all customer's subscriptions.
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   * @public ✓ This method is part of the public API
   */
  all = this.list;

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.create.name}" does not exist on the "${
        CustomersSubscriptionsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async get(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.get.name}" does not exist on the "${
        CustomersSubscriptionsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${
        CustomersSubscriptionsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${
        CustomersSubscriptionsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${
        CustomersSubscriptionsResource.apiName
      }"`,
    );
  }
}
