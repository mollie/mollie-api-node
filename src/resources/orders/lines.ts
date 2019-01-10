import { startsWith } from 'lodash';

import OrderLine from '../../models/OrderLine';
import OrdersResource from './base';
import Order from '../../models/Order';
import { ICancelParams, IUpdateParams } from '../../types/order/line/params';
import { CancelCallback, UpdateCallback } from '../../types/order/line/callback';
import Resource from '../../resource';

/**
 * The `orders_lines` resource
 *
 * @since 2.2.0
 */
export default class OrdersLinesResource extends OrdersResource {
  public resource = 'orders_lines';
  public model = OrderLine;
  public apiName = 'Orders API (Order Lines section)';

  // API METHODS
  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   * @public ✓ This method is part of the public API
   */
  delete = this.cancel;

  /**
   * Update order lines
   *
   * @param id - Order ID
   * @param params - Update order parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Order object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-orderline
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams | UpdateCallback, cb?: UpdateCallback): Promise<Order> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Order.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The order id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      this.setParentId(id);

      return super.update(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Order>;
    }

    const { ...parameters } = params;
    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The order id is invalid' } });
    }

    this.setParentId(id);

    return super.update(id, parameters) as Promise<Order>;
  }

  // ALIASES

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @param id - Order ID
   * @param params - Cancel order lines parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<boolean> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Order.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The order id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      this.setParentId(id);

      return super.delete(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<boolean>;
    }

    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.errorHandler(
        { error: { message: 'The order id is invalid' } },
        typeof params === 'function' ? params : cb,
      );
    }

    const { ...parameters } = params;
    this.setParentId(id);

    // TODO: check return type
    return super.delete(id, parameters, cb) as Promise<boolean>;
  }
}
