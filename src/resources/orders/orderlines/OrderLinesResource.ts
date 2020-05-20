import { CancelParameters, UpdateParameters } from './parameters';
import { OrderData } from '../../../data/orders/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import Order, { injectPrototypes } from '../../../data/orders/Order';
import ParentedResource from '../../ParentedResource';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class OrdersLinesResource extends ParentedResource<OrderData, Order> {
  protected getResourceUrl(orderId: string): string {
    return `orders/${orderId}/lines`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   */
  public delete: OrdersLinesResource['cancel'] = this.cancel;

  /**
   * Update order lines
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-orderline
   */
  public update(id: string, parameters: UpdateParameters): Promise<Order>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Order>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
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
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   */
  public cancel(parameters: CancelParameters): Promise<true>;
  public cancel(parameters: CancelParameters, callback: Callback<true>): void;
  public cancel(parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    const orderId = this.getParentId(parameters.orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.network.delete<true>(this.getResourceUrl(orderId), data);
  }
}
