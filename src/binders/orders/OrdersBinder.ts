import List from '../../data/list/List';
import { OrderData } from '../../data/orders/data';
import Order from '../../data/orders/Order';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { CancelParameters, CreateParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';

export const pathSegment = 'orders';

/**
 * The **Orders API** allows you to use Mollie for your order management.
 *
 * For each order in your shop, you can create an Order via the Mollie API. The order will remain valid for a certain amount of time (default 28 days).
 *
 * Just as a Payment, the Order will have a `_links.checkout` property where you can redirect your customer to pay for the Order. For each attempt to Pay, a Payment is created. If the customer pays
 * for the Order, the Order will transition to the `paid` state (or `authorized` in case of pay after delivery).
 *
 * Should the initial Payment fail, the Order remains in the `created` state so that your customer can try to pay again. This can be done using a dedicated link available through the Dashboard which
 * you can share with your customer, or you can create an additional Payment on the Order via the API.
 *
 * *Pay after delivery* payment methods, such as *Klarna Pay later*, *Klarna Slice it*, and *Vouchers* require the Orders API and cannot be used with the Payments API.
 *
 * Once you ship the goods to your customer, you should inform Mollie of the shipments via the API or via the Dashboard. This is mandatory for pay after delivery methods. Only shipped amounts will be
 * settled to your account.
 *
 * @see https://docs.mollie.com/orders/overview#orders-api
 */
export default class OrdersBinder extends Binder<OrderData, Order> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * The order can only be canceled while:
   *
   * -   the order doesn't have any open payments except for the methods `banktransfer`, `directdebit`, `klarnapaylater`, and `klarnasliceit`.
   * -   the order's `status` field is either `created`, `authorized` or `shipping`[1].
   *
   * 1.  In case of `created`, all order lines will be canceled and the new order status will be `canceled`.
   * 2.  In case of `authorized`, the authorization will be released, all order lines will be canceled and the new order status will be `canceled`.
   * 3.  In case of `shipping`, any order lines that are still `authorized` will be canceled and order lines that are `shipping` will be completed. The new order status will be `completed`.
   *
   * For more information about the status transitions please check our order status changes guide.
   *
   * [1] If the order status is `shipping`, some order lines can have the status `paid` if the order was paid using a payment method that does not support authorizations (such as iDEAL) and the order
   * lines are not shipped yet. In this case, the order cannot be canceled. You should create refunds for these order lines instead.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   */
  public delete: OrdersBinder['cancel'] = this.cancel;
  /**
   * Retrieve all orders.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   */
  public all: OrdersBinder['list'] = this.list;
  /**
   * Retrieve all orders.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   */
  public page: OrdersBinder['list'] = this.list;

  /**
   * Using the Orders API is the preferred approach when integrating the Mollie API into e-commerce applications such as webshops. If you want to use *pay after delivery* methods such as *Klarna Pay
   * later*, using the Orders API is mandatory.
   *
   * Creating an Order will automatically create the required Payment to allow your customer to pay for the order.
   *
   * Once you have created an Order, you should redirect your customer to the URL in the `_links.checkout` property from the response.
   *
   * Note that when the payment fails, expires or is canceled, you can create a new Payment for the Order using the /reference/v2/orders-api/create-order-payment. This is only possible for orders that
   * have a `created` status.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order
   */
  public create(parameters: CreateParameters): Promise<Order>;
  public create(parameters: CreateParameters): void;
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
  public list(parameters?: ListParameters): Promise<List<Order>>;
  public list(parameters: ListParameters, callback: Callback<List<Order>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list<OrderData, Order>(pathSegment, 'orders', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * This endpoint can be used to update the billing and/or shipping address of an order.
   *
   * When updating an order that uses a *pay after delivery* method such as *Klarna Pay later*, Klarna may decline the requested changes, resulting in an error response from the Mollie API. The order
   * remains intact, though the requested changes are not persisted.
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
   * -   the order doesn't have any open payments except for the methods `banktransfer`, `directdebit`, `klarnapaylater`, and `klarnasliceit`.
   * -   the order's `status` field is either `created`, `authorized` or `shipping`[1].
   *
   * 1.  In case of `created`, all order lines will be canceled and the new order status will be `canceled`.
   * 2.  In case of `authorized`, the authorization will be released, all order lines will be canceled and the new order status will be `canceled`.
   * 3.  In case of `shipping`, any order lines that are still `authorized` will be canceled and order lines that are `shipping` will be completed. The new order status will be `completed`.
   *
   * For more information about the status transitions please check our order status changes guide.
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
