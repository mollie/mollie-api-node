import { defaults, get, startsWith } from 'lodash';

import Refund from '../../models/Refund';
import OrdersResource from './base';
import List from '../../models/List';
import { CreateCallback, ListCallback } from '../../types/order/refund/callback';
import { ICreateParams, IListParams } from '../../types/order/refund/params';
import Order from '../../models/Order';
import Resource from '../../resource';
import ApiError from '../../errors/ApiError';
import NotImplementedError from '../../errors/NotImplementedError';

/**
 * The `orders_refunds` resource
 *
 * @since 3.0.0
 */
export default class OrdersRefundsResource extends OrdersResource {
  public static resource = 'orders_refunds';
  public static model = Refund;
  public apiName = 'Refunds API';

  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;

  /**
   * Create an order refund
   *
   * @param params - Create Order Refund parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Order Refund object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Refund> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.errorHandler({ detail: 'The order id is invalid' }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(orderId);

      return super.create(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Refund>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler({ detail: 'The order id is invalid' }, cb);
    }
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all order refunds
   *
   * @param params - List Order Refunds parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Order Refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Refund>> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!orderId) {
        throw new ApiError('Order ID is not set');
      }
      this.setParentId(orderId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Order>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler({ detail: 'The order id is invalid' });
    }
    this.setParentId(orderId);

    return super.list(parameters, cb);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(): Promise<Refund> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Refund> {
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
