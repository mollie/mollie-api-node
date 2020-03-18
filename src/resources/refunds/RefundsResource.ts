import Resource from '../Resource';
import { RefundData } from '../../data/refunds/data';
import Refund, { injectPrototypes } from '../../data/refunds/Refund';
import { ListParameters } from './parameters';
import List from '../../data/list/List';

/**
 * The `refunds` resource
 *
 * @since 2.0.0
 */
export default class RefundsResource extends Resource<RefundData, Refund> {
  protected getResourceUrl(): string {
    return 'refunds';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * List Refunds
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * List Refunds
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
   * List Refunds
   *
   * @param params - List Refunds parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   *
   * @public ✓ This method is part of the public API
   */
  public async list(parameters: ListParameters = {}): Promise<List<Refund>> {
    const result = await this.network.list(this.getResourceUrl(), 'refunds', parameters);
    return this.injectPaginationHelpers(result, this.list, parameters);
  }
}
