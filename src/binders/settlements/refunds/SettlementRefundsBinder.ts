import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import List from '../../../data/list/List';
import { RefundData } from '../../../data/refunds/data';
import Refund from '../../../data/refunds/Refund';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { IterateParameters, ListParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `settlements/${settlementId}/refunds`;
}

export default class SettlementRefundsBinder extends Binder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all refunds included in a settlement.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-refunds
   */
  public page(parameters: ListParameters): Promise<List<Refund>>;
  public page(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = parameters;
    return this.networkClient.list<RefundData, Refund>(getPathSegments(settlementId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all refunds included in a settlement.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-refunds
   */
  public iterate(parameters: IterateParameters) {
    const { settlementId, valuesPerMinute, ...query } = parameters;
    return this.networkClient.iterate<RefundData, Refund>(getPathSegments(settlementId), 'refunds', query, valuesPerMinute);
  }
}
