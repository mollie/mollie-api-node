import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Chargeback from '../../../data/chargebacks/Chargeback';
import { type ChargebackData } from '../../../data/chargebacks/Chargeback';
import type Page from '../../../data/page/Page';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `/settlements/${settlementId}/chargebacks`;
}

export default class SettlementChargebacksBinder extends Binder<ChargebackData, Chargeback> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all chargebacks included in a settlement.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-chargebacks
   */
  public page(parameters: PageParameters): Promise<Page<Chargeback>>;
  public page(parameters: PageParameters, callback: Callback<Page<Chargeback>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = parameters;
    return this.networkClient.page<ChargebackData, Chargeback>(getPathSegments(settlementId), 'chargebacks', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all chargebacks included in a settlement.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-chargebacks
   */
  public iterate(parameters: IterateParameters) {
    const { settlementId, valuesPerMinute, ...query } = parameters;
    return this.networkClient.iterate<ChargebackData, Chargeback>(getPathSegments(settlementId), 'chargebacks', query, valuesPerMinute);
  }
}
