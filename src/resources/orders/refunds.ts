import Refund from '../../models/Refund';
import OrdersResource from './base';
import List from '../../models/List';
import { CreateCallback, ListCallback } from '../../types/order/refund/callback';
import ApiException from '../../exceptions/ApiException';
import { ICreateParams, IListParams } from '../../types/order/refund/params';

/**
 * The `orders_refunds` resource
 *
 * @since 2.2.0
 */
export default class OrdersRefundsResource extends OrdersResource {
  static resource = 'orders_refunds';
  static model = Refund;

  /**
   * Create an order refund
   *
   * @param params - Create Order Refund parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Order Refund object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund#
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Refund> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all order refunds
   *
   * @param params - List Order Refunds parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Order Refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   * @public ✓ This method is part of the public API
   */
  public async list(params: IListParams, cb?: ListCallback): Promise<List<Refund>> {
    const { orderId, ...parameters } = params;
    this.setParentId(orderId);

    return super.list(parameters, cb);
  }

  // ALIASES

  /**
   * Get all order refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
   * @public ✓ This method is part of the public API
   */
  all = this.list;

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  async get(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.get.name}" does not exist on the "${OrdersRefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  async update(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${OrdersRefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${OrdersRefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${OrdersRefundsResource.apiName}"`,
    );
  }
}
