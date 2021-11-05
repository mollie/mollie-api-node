import { OrderData } from '../../../data/orders/data';
import Order from '../../../data/orders/Order';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { CancelParameters, UpdateParameters } from './parameters';

function getPathSegments(orderId: string) {
  return `orders/${orderId}/lines`;
}

export default class OrderLinesBinder extends InnerBinder<OrderData, Order> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * This endpoint can be used to cancel one or more order lines that were previously authorized using a *pay after delivery* payment method. Use the Cancel Order API if you want to cancel the entire
   * order or the remainder of the order.
   *
   * Canceling or partially canceling an order line will immediately release the authorization held for that amount. Your customer will be able to see the updated order in his portal / app. Any
   * canceled lines will be removed from the customer's point of view, but will remain visible in the Mollie Dashboard.
   *
   * You should cancel an order line if you do not intend to (fully) ship it.
   *
   * An order line can only be canceled while its `status` field is either `authorized` or `shipping`. If you cancel an `authorized` order line, the new order line status will be `canceled`. Canceling
   * a `shipping` order line will result in a `completed` order line status.
   *
   * If the order line is `paid` or already `completed`, you should create a refund using the Create Order Refund API instead.
   *
   * For more information about the status transitions please check our order status changes guide.
   *
   * @since 3.0.0
   * @deprecated Use `cancel` instead.
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   */
  public delete: OrderLinesBinder['cancel'] = this.cancel;

  /**
   * This endpoint can be used to update an order line. Only the lines that belong to an order with status `created`, `pending` or `authorized` can be updated.
   *
   * Use cases for this endpoint could be updating the `name`, `productUrl`, `imageUrl`, and `metadata` for a certain order line because your customer wants to swap the item for a different variant,
   * for example exchanging a blue skirt for the same skirt in red.
   *
   * Or update the `quantity`, `unitPrice`, `discountAmount`, `totalAmount`, `vatAmount` and `vatRate` if you want to substitute a product for an entirely different one.
   *
   * Alternatively, you can also (partially) cancel order lines instead of updating the quantity.
   *
   * When updating an order line that uses a *pay after delivery* method such as *Klarna Pay later*, Klarna may decline the requested changes, resulting in an error response from the Mollie API. The
   * order remains intact, though the requested changes are not persisted.
   *
   * @since 3.0.0
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
    return this.networkClient.patch<OrderData, Order>(`${getPathSegments(orderId)}/${id}`, data);
  }

  /**
   * This endpoint can be used to cancel one or more order lines that were previously authorized using a *pay after delivery* payment method. Use the Cancel Order API if you want to cancel the entire
   * order or the remainder of the order.
   *
   * Canceling or partially canceling an order line will immediately release the authorization held for that amount. Your customer will be able to see the updated order in his portal / app. Any
   * canceled lines will be removed from the customer's point of view, but will remain visible in the Mollie Dashboard.
   *
   * You should cancel an order line if you do not intend to (fully) ship it.
   *
   * An order line can only be canceled while its `status` field is either `authorized` or `shipping`. If you cancel an `authorized` order line, the new order line status will be `canceled`. Canceling
   * a `shipping` order line will result in a `completed` order line status.
   *
   * If the order line is `paid` or already `completed`, you should create a refund using the Create Order Refund API instead.
   *
   * For more information about the status transitions please check our order status changes guide.
   *
   * @since 3.0.0
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
    return this.networkClient.delete<OrderData, true>(getPathSegments(orderId), data);
  }
}
