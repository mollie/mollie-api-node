import { GetParameters, ListParameters } from './parameters';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import Capture, { CaptureData, injectPrototypes } from '../../../data/payments/captures/Capture';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

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
   */
  public all: PaymentsCapturesResource['list'] = this.list;
  /**
   * Retrieve a list of Payment Captures
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   */
  public page: PaymentsCapturesResource['list'] = this.list;

  /**
   * Get a Payment Capture by ID
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-Capture
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
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.get(`${this.getResourceUrl(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve a list of Payment Captures
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   */
  public list(parameters: ListParameters): Promise<List<Capture>>;
  public list(parameters: ListParameters, callback: Callback<List<Capture>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.list(this.getResourceUrl(paymentId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
