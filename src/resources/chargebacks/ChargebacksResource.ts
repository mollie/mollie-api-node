import ParentedResource from '../ParentedResource';
import Chargeback, { ChargebackData, injectPrototypes } from '../../data/chargebacks/Chargeback';
import List from '../../data/list/List';
import { ListParameters } from './parameters';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';

/**
 * The `chargebacks` resource
 *
 * @since 2.0.0-rc.1
 */
export default class ChargebacksResource extends ParentedResource<ChargebackData, Chargeback> {
  protected getResourceUrl(): string {
    return 'chargebacks';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * List chargebacks
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: ChargebacksResource['list'] = this.list;
  /**
   * List chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: ChargebacksResource['list'] = this.list;

  /**
   * List chargebacks
   *
   * @param params - List chargebacks parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters?: ListParameters): Promise<List<Chargeback>>;
  public list(parameters: ListParameters, callback: Callback<List<Chargeback>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'chargebacks', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
