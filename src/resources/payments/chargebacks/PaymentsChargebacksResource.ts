import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import Chargeback, { ChargebackData, injectPrototypes } from '../../../data/chargebacks/Chargeback';
import checkId from '../../../plumbing/checkId';
import ApiError from '../../../errors/ApiError';
import { GetParameters, ListParameters } from './parameters';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';

/**
 * The `payments_chargebacks` resource
 *
 * @since 1.1.1
 */
export default class PaymentsChargebacksResource extends ParentedResource<ChargebackData, Chargeback> {
  protected getResourceUrl(paymentId: string): string {
    return `payments/${paymentId}/chargebacks`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: PaymentsChargebacksResource['list'] = this.list;
  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: PaymentsChargebacksResource['list'] = this.list;

  /**
   * Get a Payment Chargeback by ID
   *
   * @param id - Chargeback ID
   * @param params - Get Payment Chargeback parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Chargeback object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters: GetParameters): Promise<Chargeback>;
  public get(id: string, parameters: GetParameters, callback: Callback<Chargeback>): void;
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
    return this.network.get(`${this.getResourceUrl(paymentId!)}/${id}`, query);
  }

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @param params - Retrieve Payment Chargebacks list parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Chargeback>>;
  public list(parameters: ListParameters, callback: Callback<List<Chargeback>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters || {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.network.list(this.getResourceUrl(paymentId!), 'chargebacks', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
