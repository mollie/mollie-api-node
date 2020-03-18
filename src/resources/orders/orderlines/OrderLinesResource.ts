import { UpdateParameters, CancelParameters } from '../shipments/parameters';
import Order, { injectPrototypes } from '../../../data/orders/Order';
import { OrderData } from '../../../data/orders/data';
import ParentedResource from '../../ParentedResource';
import checkId from '../../../plumbing/checkId';
import ApiError from '../../../errors/ApiError';

/**
 * The `orders_lines` resource
 *
 * @since 3.0.0
 */
export default class OrdersLinesResource extends ParentedResource<OrderData, Order> {
  protected getResourceUrl(orderId: string): string {
    return `orders/${orderId}/payments`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete = this.cancel;

  /**
   * Update order lines
   *
   * @param id - Order ID
   * @param params - Update order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Order object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-orderline
   *
   * @public ✓ This method is part of the public API
   */
  public update(id: string, parameters: UpdateParameters): Promise<Order> {
    if (!checkId(id, 'orderline')) {
      throw new ApiError('The orders_lines id is invalid');
    }
    const orderId = this.getParentId(parameters.orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.network.patch(`${this.getResourceUrl(orderId)}/${id}`, data);
  }

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @param id - Order ID
   * @param params - Cancel order lines parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   *
   * @public ✓ This method is part of the public API
   */
  public cancel(id: string, parameters: CancelParameters): Promise<true> {
    if (!checkId(id, 'orderline')) {
      throw new ApiError('The orders_lines id is invalid');
    }
    const orderId = this.getParentId(parameters.orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.network.delete(`${this.getResourceUrl(orderId)}/${id}`) as Promise<true>;
  }
}
