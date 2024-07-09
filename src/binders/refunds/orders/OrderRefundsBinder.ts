import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import { type RefundData } from '../../../data/refunds/data';
import type Refund from '../../../data/refunds/Refund';
import ApiError from '../../../errors/ApiError';
import alias from '../../../plumbing/alias';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type IterateParameters, type PageParameters } from './parameters';

export function getPathSegments(orderId: string) {
  return `orders/${orderId}/refunds`;
}

export default class OrderRefundsBinder extends Binder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * When using the Orders API, refunds should be made for a specific order.
   *
   * If you want to refund arbitrary amounts, however, you can also use the Create payment refund endpoint for Pay later and Slice it by creating a refund on the payment itself.
   *
   * If an order line is still in the `authorized` status, it cannot be refunded. You should cancel it instead. Order lines that are `paid`, `shipping` or `completed` can be refunded.
   *
   * For more details on how refunds work, see /payments/refunds.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-order-refund
   */
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { orderId, ...data } = parameters;
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.post<RefundData, Refund>(getPathSegments(orderId), data);
  }

  /**
   * Retrieve a list of all refunds made for a specific order.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-order-refunds
   */
  public page(parameters: PageParameters): Promise<Page<Refund>>;
  public page(parameters: PageParameters, callback: Callback<Page<Refund>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { orderId, ...query } = parameters;
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.page<RefundData, Refund>(getPathSegments(orderId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a list of all refunds made for a specific order.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-order-refunds
   */
  public iterate(parameters: IterateParameters) {
    const { orderId, valuesPerMinute, ...query } = parameters;
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    return this.networkClient.iterate<RefundData, Refund>(getPathSegments(orderId), 'refunds', query, valuesPerMinute);
  }
}
