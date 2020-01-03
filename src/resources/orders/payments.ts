import { defaults, get, startsWith } from 'lodash';

import Payment from '../../models/Payment';
import OrdersResource from './base';
import Order from '../../models/Order';
import { ICreateParams } from '../../types/order/payment/params';
import { CreateCallback } from '../../types/payment/callback';
import Resource from '../../resource';
import NotImplementedError from '../../errors/NotImplementedError';
import List from '../../models/List';

/**
 * The `orders_payments` resource
 *
 * @since 3.0.0
 */
export default class OrdersPaymentsResource extends OrdersResource {
  public static resource = 'orders_payments';
  public static model = Payment;
  public apiName = 'Orders API (Order Payment section)';

  /**
   * Update order payment
   *
   * @param id - Order ID
   * @param params - Create order payment parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The created Payment object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-payment
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Payment> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.create(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Payment>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid', cb);
    }
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Payment>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async list(): Promise<List<Payment>> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(): Promise<Payment> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Payment> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
