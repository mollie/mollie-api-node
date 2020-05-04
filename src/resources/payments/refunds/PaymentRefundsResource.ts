import { CancelParameters, CreateParameters, GetParameters, ListParameters } from './parameters';
import { RefundData } from '../../../data/refunds/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import Refund, { injectPrototypes } from '../../../data/refunds/Refund';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

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
  public all: PaymentsRefundsResource['list'] = this.list;
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
  public page: PaymentsRefundsResource['list'] = this.list;
  /**
   * Cancel a Payment Refund by ID
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete: PaymentsRefundsResource['cancel'] = this.cancel;

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
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
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
  public get(id: string, parameters: GetParameters): Promise<Refund>;
  public get(id: string, parameters: GetParameters, callback: Callback<Refund>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
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
  public list(parameters: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.list(this.getResourceUrl(paymentId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
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
  public cancel(id: string, parameters: CancelParameters): Promise<true>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Promise<true>>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.delete<true>(`${this.getResourceUrl(paymentId)}/${id}`);
  }
}
