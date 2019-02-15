import { get, startsWith } from 'lodash';

import CustomersBaseResource from './base';
import Subscription from '../../../models/Subscription';
import List from '../../../models/List';
import Payment from '../../../models/Payment';
import { IListParams } from '../../../types/subscription/payment/params';
import { ListCallback } from '../../../types/subscription/payment/callback';
import Customer from '../../../models/Customer';
import Resource from '../../../resource';
import NotImplementedException from '../../../exceptions/NotImplementedException';

/**
 * The `customers_subscriptions` resource.
 *
 * @since 1.3.2
 */
export default class CustomersSubscriptionsResource extends CustomersBaseResource {
  public static resource = 'customers_subscriptions';
  public static model = Subscription;
  public apiName = 'Subscriptions API (Payments section)';

  /**
   * Get all customer's subscriptions.
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * Get all customer's subscriptions.
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   * @public ✓ This method is part of the public API
   */
  public page = this.list;

  /**
   * Get all customer's subscriptions.
   *
   * @param params - List Customer's Subscriptions parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Subscriptions
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Payment>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      const subscriptionId = get(params, 'subscriptionId') || this.subscriptionId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      if (!startsWith(subscriptionId, Subscription.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The subscription id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);
      this.setSubscriptionId(subscriptionId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Payment>>;
    }

    const { customerId, subscriptionId, ...parameters } = params;
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } });
    }
    if (!startsWith(subscriptionId, Subscription.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The subscription id is invalid' } });
    }
    this.setParentId(customerId);
    this.setSubscriptionId(subscriptionId);

    return super.list(parameters, cb) as Promise<List<Payment>>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async create(): Promise<Payment> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(): Promise<Payment> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Payment> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }
}
