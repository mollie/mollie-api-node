import { GetParameters, ListParameters } from './parameters';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import Capture, { CaptureData, injectPrototypes } from '../../../data/payments/captures/Capture';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

/**
 * The `payments_captures` resource
 *
 * @since 1.1.1
 */
export default class PaymentsCapturesResource extends ParentedResource<CaptureData, Capture> {
  protected getResourceUrl(paymentId: string): string {
    return `payments/${paymentId}/captures`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve a list of Payment Captures
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: PaymentsCapturesResource['list'] = this.list;
  /**
   * Retrieve a list of Payment Captures
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: PaymentsCapturesResource['list'] = this.list;

  /**
   * Get a Payment Capture by ID
   *
   * @param id - Capture ID
   * @param params - Get Payment Capture parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Capture object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-Capture
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters: GetParameters): Promise<Capture>;
  public get(id: string, parameters: GetParameters, callback: Callback<Capture>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'capture')) {
      throw new ApiError('The capture id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (paymentId == undefined || !checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.get(`${this.getResourceUrl(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve a list of Payment Captures
   *
   * @param params - Retrieve Payment Captures list parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Captures
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Capture>>;
  public list(parameters: ListParameters, callback: Callback<List<Capture>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (paymentId == undefined || !checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.list(this.getResourceUrl(paymentId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
