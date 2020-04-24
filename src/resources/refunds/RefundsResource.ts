import { ListParameters } from './parameters';
import { RefundData } from '../../data/refunds/data';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Refund, { injectPrototypes } from '../../data/refunds/Refund';
import Resource from '../Resource';
import renege from '../../plumbing/renege';

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
  public all: RefundsResource['list'] = this.list;
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
  public page: RefundsResource['list'] = this.list;

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
  public list(parameters?: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'refunds', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
