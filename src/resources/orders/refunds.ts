import { defaults, get, startsWith } from 'lodash';

import Refund from '../../models/Refund';
import OrdersResource from './base';
import List from '../../models/List';
import { CreateCallback, ListCallback } from '../../types/order/refund/callback';
import ApiException from '../../exceptions/ApiException';
import { ICreateParams, IListParams } from '../../types/order/refund/params';
import Order from '../../models/Order';
import Resource from '../../resource';

/**
 * The `orders_refunds` resource
 *
 * @since 2.2.0
 */
export default class OrdersRefundsResource extends OrdersResource {
  public static resource = 'orders_refunds';
  public static model = Refund;
  public apiName = 'Refunds API';

  /**
   * Get all order refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * Get all order refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   * @public ✓ This method is part of the public API
   */
  public page = this.list;

  /**
   * Create an order refund
   *
   * @param params - Create Order Refund parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Order Refund object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund#
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Refund> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        throw Resource.errorHandler(
          { error: { message: 'The order id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      this.setParentId(orderId);

      return super.create(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Refund>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      throw Resource.errorHandler(Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb));
    }
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all order refunds
   *
   * @param params - List Order Refunds parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Order Refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Refund>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!orderId) {
        throw new ApiException('Order ID is not set');
      }
      this.setParentId(orderId);

      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Order>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { orderId, ...parameters } = defaults(params, { orderId: this.parentId });
    if (!startsWith(orderId, Order.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The order id is invalid' } });
    }
    this.setParentId(orderId);

    return super.list(parameters, cb);
  }

  /**
   * @deprecated This method is not available
   */
  public async get(): Promise<Refund> {
    throw new ApiException(`The method "get" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Refund> {
    throw new ApiException(`The method "update" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(`The method "delete" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(`The method "cancel" does not exist on the "${this.apiName}"`);
  }
}
