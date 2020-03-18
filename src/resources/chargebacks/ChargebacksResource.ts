import ParentedResource from '../ParentedResource';
import Chargeback, { ChargebackData, injectPrototypes } from '../../data/chargebacks/Chargeback';
import List from '../../data/list/List';
import { ListParameters } from './parameters';

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
  public all = this.list;
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
  public page = this.list;

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
  public async list(parameters: ListParameters = {}): Promise<List<Chargeback>> {
    const result = await this.network.list(this.getResourceUrl(), 'chargebacks', parameters);
    return this.injectPaginationHelpers(result, this.list, parameters);
  }
}
