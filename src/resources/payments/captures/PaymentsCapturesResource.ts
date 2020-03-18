import ParentedResource from '../../ParentedResource';
import Capture, { CaptureData, injectPrototypes } from '../../../data/payments/captures/Capture';
import checkId from '../../../plumbing/checkId';
import ApiError from '../../../errors/ApiError';
import { ContextParameters } from './parameters';
import List from '../../../data/list/List';

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
  public all = this.list;
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
  public page = this.list;

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
  public get(id: string, parameters: ContextParameters): Promise<Capture> {
    if (!checkId(id, 'capture')) {
      throw new ApiError('The capture id is invalid');
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
  public async list(parameters: ContextParameters): Promise<List<Capture>> {
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    const result = await this.network.list(this.getResourceUrl(paymentId), 'captures', query);
    return this.injectPaginationHelpers(result, this.list, parameters);
  }
}
