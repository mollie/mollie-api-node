import Resource from '../Resource';
import { OrderData } from '../../data/orders/data';
import Order, { injectPrototypes } from '../../data/orders/Order';
import { CreateParameters, GetParameters, UpdateParameters, ListParameters, CancelParameters } from './parameters';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import List from '../../data/list/List';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';

/**
 * The `orders` resource
 *
 * @since 3.0.0
 */
export default class OrdersResource extends Resource<OrderData, Order> {
  protected getResourceUrl(): string {
    return 'orders';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Cancel an Order.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete: OrdersResource['cancel'] = this.cancel;
  /**
   * List Orders.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: OrdersResource['list'] = this.list;
  /**
   * List Orders.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: OrdersResource['list'] = this.list;

  /**
   * Using the Orders API is the preferred approach when integrating
   * the Mollie API into e-commerce applications such as webshops.
   * If you want to use pay after delivery methods such as Klarna Pay later,
   * using the Orders API is mandatory.
   *
   * Creating an order will automatically create the required payment to allow
   * your customer to pay for the order.
   *
   * Once you have created an order, you should redirect your customer to the
   * URL in the _links.checkout property from the response.
   *
   * Note that when the payment fails, expires or is canceled, you can create
   * a new payment using the Create order payment API. This is only possible
   * for orders that have a created status.
   *
   * @param params - Create Order parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of
   *             the returned `Promise` object
   *
   * @returns The newly created Order
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order
   *
   * @public ✓ This method is part of the public API
   */
  public create(parameters: CreateParameters): Promise<Order>;
  public create(parameters: CreateParameters): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.network.post(this.getResourceUrl(), parameters);
  }

  /**
   * Retrieve an Order.
   *
   * @param id - Order ID
   * @param params - Get Order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Order
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters?: GetParameters): Promise<Order>;
  public get(id: string, parameters: GetParameters, callback: Callback<Order>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * List Orders.
   *
   * @param params - List Order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of the Orders found
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters?: ListParameters): Promise<List<Order>>;
  public list(parameters: ListParameters, callback: Callback<List<Order>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'orders', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * Update an Order.
   *
   * @param id - Order ID
   * @param params - Update Order parameters
   *               (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Order
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-order
   *
   * @public ✓ This method is part of the public API
   */
  public update(id: string, parameters: UpdateParameters): Promise<Order>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Order>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.network.patch(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Cancel an Order.
   *
   * @param id - Order ID
   * @param params - Cancel Order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback object, can be used instead of the returned `Promise` object
   *
   * @returns Updated Order object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   *
   * @public ✓ This method is part of the public API
   */
  public cancel(id: string, parameters: CancelParameters): Promise<Order>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Order>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.network.delete(`${this.getResourceUrl()}/${id}`) as Promise<Order>;
  }
}
