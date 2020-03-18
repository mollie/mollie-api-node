import ParentedResource from '../../ParentedResource';
import { RefundData } from '../../../data/refunds/data';
import Refund, { injectPrototypes } from '../../../data/refunds/Refund';
import { CreateParameters, GetParameters, ListParameters, ContextParameters } from './parameters';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import List from '../../../data/list/List';

/**
 * The `payments_refunds` resource
 *
 * @since 1.1.1
 */
export default class PaymentsRefundsResource extends ParentedResource<RefundData, Refund> {
  protected getResourceUrl(paymentId: string): string {
    return `payments/${paymentId}/refunds`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Get all payment refunds. Alias of list.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * Get all payment refunds. Alias of list.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;
  /**
   * Cancel a Payment Refund by ID
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete = this.cancel;

  /**
   * Create a payment refund
   *
   * @param params - Create Payment Refund parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly create Payment Refund
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-refund
   *
   * @public ✓ This method is part of the public API
   */
  public create(parameters: CreateParameters): Promise<Refund> {
    const paymentId = this.getParentId(parameters.paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...data } = parameters;
    return this.network.post(this.getResourceUrl(paymentId), data);
  }

  /**
   * Get a payment refund by ID
   *
   * @param id - Refund ID
   * @param params - Retrieve Payment Refund parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters: GetParameters): Promise<Refund> {
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.get(`${this.getResourceUrl(paymentId)}/${id}`, query);
  }

  /**
   * Get all payment refunds.
   *
   * @param params - List Payment Refunds parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   *
   * @public ✓ This method is part of the public API
   */
  public async list(parameters: ListParameters): Promise<List<Refund>> {
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    const result = await this.network.list(this.getResourceUrl(paymentId), 'refunds', query);
    return this.injectPaginationHelpers(result, this.list, parameters);
  }

  /**
   * Cancel a payment refund by ID
   *
   * @param id - Refund ID
   * @param params - Cancel payment refund parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @return Success status
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   *
   * @public ✓ This method is part of the public API
   */
  public cancel(id: string, parameters: ContextParameters): Promise<true> {
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.delete(`${this.getResourceUrl(paymentId)}/${id}`) as Promise<true>;
  }
}
