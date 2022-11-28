import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Chargeback, { ChargebackData } from '../../../data/chargebacks/Chargeback';
import List from '../../../data/list/List';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { IterateParameters, ListParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `settlements/${settlementId}/chargebacks`;
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
  public page(parameters: ListParameters): Promise<List<Chargeback>>;
  public page(parameters: ListParameters, callback: Callback<List<Chargeback>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = parameters;
    return this.networkClient.list<ChargebackData, Chargeback>(getPathSegments(settlementId), 'chargebacks', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
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
