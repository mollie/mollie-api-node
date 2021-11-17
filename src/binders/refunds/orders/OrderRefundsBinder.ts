import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import List from '../../../data/list/List';
import { RefundData } from '../../../data/refunds/data';
import Refund from '../../../data/refunds/Refund';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { CreateParameters, ListParameters } from './parameters';

export function getPathSegments(orderId: string) {
  return `orders/${orderId}/refunds`;
}

export default class OrderRefundsBinder extends InnerBinder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all order refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public all: OrderRefundsBinder['page'] = this.page;
  /**
   * Retrieve all order refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public list: OrderRefundsBinder['page'] = this.page;

  /**
   * When using the Orders API, refunds should be made against the Order. When using *pay after delivery* payment methods such as *Klarna Pay later* and *Klarna Slice it*, this ensures that your
   * customer will receive credit invoices with the correct product information on them and generally have a great experience.
   *
   * However, if you want to refund arbitrary amounts you can use the /reference/v2/refunds-api/create-refund for Pay later and Slice it.
   *
   * If an order line is still in the `authorized` status, it cannot be refunded. You should cancel it instead. Order lines that are `paid`, `shipping` or `completed` can be refunded.
   *
   * For more details on how refunds work, see /payments/refunds.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund
   */
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const orderId = this.getParentId(parameters.orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.networkClient.post<RefundData, Refund>(getPathSegments(orderId), data);
  }

  /**
   * Retrieve all order refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public page(parameters: ListParameters): Promise<List<Refund>>;
  public page(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const orderId = this.getParentId((parameters ?? {}).orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...query } = parameters ?? {};
    return this.networkClient.list<RefundData, Refund>(getPathSegments(orderId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.page, parameters ?? {}));
  }

  /**
   * Retrieve all order refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public iterate(parameters: Omit<ListParameters, 'limit'>) {
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const orderId = this.getParentId((parameters ?? {}).orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...query } = parameters ?? {};
    return this.networkClient.iterate<RefundData, Refund>(getPathSegments(orderId), 'refunds', { query, limit: 64 });
  }
}
