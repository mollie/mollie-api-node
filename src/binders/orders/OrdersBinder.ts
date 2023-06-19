import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Page from '../../data/page/Page';
import { OrderData } from '../../data/orders/data';
import Order from '../../data/orders/Order';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { CancelParameters, CreateParameters, GetParameters, IterateParameters, PageParameters, UpdateParameters } from './parameters';

export const pathSegment = 'orders';

/**
 * The **Orders API** allows you to use Mollie for your order management.
 *
 * For each order in your shop, you can create an order via the Mollie API. The order will remain valid for a certain amount of time (default 28 days).
 *
 * Just as a regular payment, the order will have a `_links.checkout` property where you can redirect your customer to pay for the order. For each attempt to pay, a payment object is created. If the
 * customer pays for the order, the order will transition to the `paid` state (or `authorized` in case of Klarna payment methods).
 *
 * Should the initial payment fail, the order remains in the `created` state so that your customer can try to pay again. This can be done using a dedicated link available through the Dashboard which
 * you can share with your customer, or you can create an additional payment on the order via the API.
 *
 * Once you ship the goods to your customer, you should inform Mollie of the shipments via the API or via the Dashboard. This is mandatory for pay-after-delivery methods. Only shipped amounts will be
 * settled to your account.
 *
 * The following payment methods require the Orders API and cannot be used with the Payments API:
 *
 * -   *Pay after delivery* payment methods, such as Klarna Pay later, Klarna Slice it and in3
 * -   Klarna Pay now
 * -   Eco vouchers, gift vouchers, and meal vouchers
 *
 * @see https://docs.mollie.com/orders/overview#orders-api
 */
export default class OrdersBinder extends Binder<OrderData, Order> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Using the Orders API is the preferred approach when integrating the Mollie API into e-commerce applications such as webshops. If you want to use *Klarna Pay now*, *Klarna Pay later*, *Klarna
   * Slice it*, *in3* or *Vouchers*, using the Orders API is mandatory.
   *
   * Creating an Order will automatically create the required Payment to allow your customer to pay for the order.
   *
   * Once you have created an Order, you should redirect your customer to the URL in the `_links.checkout` property from the response.
   *
   * Note that when the payment fails, expires or is canceled, you can create a new payment for the order using the Create order payment endpoint. This is only possible for orders that have a
   * `created` status.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order
   */
  public create(parameters: CreateParameters): Promise<Order>;
  public create(parameters: CreateParameters, callback: Callback<Order>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { embed, ...data } = parameters;
    const query = embed != undefined ? { embed } : undefined;
    return this.networkClient.post<OrderData, Order>(pathSegment, data, query);
  }

  /**
   * Retrieve a single order by its ID.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order
   */
  public get(id: string, parameters?: GetParameters): Promise<Order>;
  public get(id: string, parameters: GetParameters, callback: Callback<Order>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.get<OrderData, Order>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all orders.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   */
  public page(parameters?: PageParameters): Promise<Page<Order>>;
  public page(parameters: PageParameters, callback: Callback<Page<Order>>): void;
  public page(parameters?: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<OrderData, Order>(pathSegment, 'orders', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all orders.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<OrderData, Order>(pathSegment, 'orders', query, valuesPerMinute);
  }

  /**
   * This endpoint can be used to update the billing and/or shipping address of an order.
   *
   * When updating an order that uses a Klarna payment method, Klarna may decline the requested changes, resulting in an error response from the Mollie API. The order remains intact, though the
   * requested changes are not persisted.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/update-order
   */
  public update(id: string, parameters: UpdateParameters): Promise<Order>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Order>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.patch<OrderData, Order>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * The order can only be canceled while:
   *
   * -   the order doesn't have any open payments except for the methods `banktransfer`, `directdebit`, `klarnapaylater`, `klarnapaynow`, and `klarnasliceit`.
   * -   the order's `status` field is either `created`, `authorized` or `shipping`[1].
   *
   * 1.  In case of `created`, all order lines will be canceled and the new order status will be `canceled`.
   * 2.  In case of `authorized`, the authorization will be released, all order lines will be canceled and the new order status will be `canceled`.
   * 3.  In case of `shipping`, any order lines that are still `authorized` will be canceled and order lines that are `shipping` will be completed. The new order status will be `completed`.
   *
   * For more information about the status transitions, check our order status changes guide.
   *
   * [1] If the order status is `shipping`, some order lines can have the status `paid` if the order was paid using a payment method that does not support authorizations (such as iDEAL) and the order
   * lines are not shipped yet. In this case, the order cannot be canceled. You should create refunds for these order lines instead.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   */
  public cancel(id: string, parameters?: CancelParameters): Promise<Order>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Order>): void;
  public cancel(id: string, parameters?: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.delete<OrderData, Order>(`${pathSegment}/${id}`, parameters);
  }
}
