import { CreateParameters, ListParameters } from './parameters';
import { RefundData } from '../../../data/refunds/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import NetworkClient from '../../../NetworkClient';
import ParentedResource from '../../ParentedResource';
import Refund, { injectPrototypes } from '../../../data/refunds/Refund';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class RefundsResource extends ParentedResource<RefundData, Refund> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(orderId: string): string {
    return `orders/${orderId}/refunds`;
  }

  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public all: RefundsResource['list'] = this.list;
  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public page: RefundsResource['list'] = this.list;

  /**
   * Create an order refund
   *
   * @since 3.0.0
   *
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
    return this.networkClient.post<Refund>(this.getResourceUrl(orderId), data);
  }

  /**
   * Get all order refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   */
  public list(parameters: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const orderId = this.getParentId((parameters ?? {}).orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...query } = parameters ?? {};
    return this.networkClient.list(this.getResourceUrl(orderId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.list, parameters ?? {}));
  }
}
