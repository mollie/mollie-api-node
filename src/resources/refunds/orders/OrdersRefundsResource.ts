import { CreateParameters, ListParameters } from './parameters';
import { RefundData } from '../../../data/refunds/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import Refund, { injectPrototypes } from '../../../data/refunds/Refund';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class RefundsResource extends ParentedResource<RefundData, Refund> {
  protected getResourceUrl(orderId: string): string {
    return `orders/${orderId}/refunds`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: RefundsResource['list'] = this.list;
  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: RefundsResource['list'] = this.list;

  /**
   * Create an order refund
   *
   * @param params - Create Order Refund parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Order Refund object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund
   *
   * @public ✓ This method is part of the public API
   */
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const orderId = this.getParentId(parameters.orderId);
    if (orderId == undefined || !checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.network.post(this.getResourceUrl(orderId), data);
  }

  /**
   * Get all order refunds
   *
   * @param params - List Order Refunds parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Order Refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const orderId = this.getParentId((parameters || {}).orderId);
    if (orderId == undefined || !checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...query } = parameters || {};
    return this.network.list(this.getResourceUrl(orderId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.list, parameters || {}));
  }
}
