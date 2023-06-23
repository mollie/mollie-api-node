import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Chargeback from '../../data/chargebacks/Chargeback';
import { type ChargebackData } from '../../data/chargebacks/Chargeback';
import type Page from '../../data/page/Page';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'chargebacks';

export default class ChargebacksBinder extends Binder<ChargebackData, Chargeback> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all chargebacks filed for your payments.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public page(parameters?: PageParameters): Promise<Page<Chargeback>>;
  public page(parameters: PageParameters, callback: Callback<Page<Chargeback>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<ChargebackData, Chargeback>(pathSegment, 'chargebacks', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all chargebacks filed for your payments.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<ChargebackData, Chargeback>(pathSegment, 'chargebacks', query, valuesPerMinute);
  }
}
