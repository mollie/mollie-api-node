import { CancelParameters, CreateParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';
import { OrderData } from '../../data/orders/data';
import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Order, { injectPrototypes } from '../../data/orders/Order';
import Resource from '../Resource';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';

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
   */
  public delete: OrdersResource['cancel'] = this.cancel;
  /**
   * List Orders.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   */
  public all: OrdersResource['list'] = this.list;
  /**
   * List Orders.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
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
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order
   */
  public create(parameters: CreateParameters): Promise<Order>;
  public create(parameters: CreateParameters): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { embed, ...data } = parameters;
    const query = embed != undefined ? { embed } : undefined;
    return this.network.post(this.getResourceUrl(), data, query);
  }

  /**
   * Retrieve an Order.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order
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
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
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
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-order
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
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   */
  public cancel(id: string, parameters?: CancelParameters): Promise<Order>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Order>): void;
  public cancel(id: string, parameters?: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.network.delete<Order>(`${this.getResourceUrl()}/${id}`, parameters);
  }
}
