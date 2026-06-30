import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import type Capture from '../../../data/payments/captures/Capture';
import { type CaptureData } from '../../../data/payments/captures/data';
import foldParameters from '../../../plumbing/foldParameters';
import renege from '../../../plumbing/renege';
import withParameterDefaults from '../../../plumbing/withParameterDefaults';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `settlements/${settlementId}/captures`;
}

export default class SettlementCapturesBinder extends Binder<CaptureData, Capture> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    withParameterDefaults(this, networkClient, { page: ['testmode'], iterate: ['testmode'] });
  }

  /**
   * Retrieve all captures included in the given settlement.
   *
   * The response is in the same format as the response of the [List captures endpoint](https://docs.mollie.com/reference/list-captures).
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/list-settlement-captures
   */
  public page(parameters: PageParameters): Promise<Page<Capture>>;
  public page(parameters: PageParameters, callback: Callback<Page<Capture>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = foldParameters(parameters, { embed: ['include'] });
    return this.networkClient.page<CaptureData, Capture>(getPathSegments(settlementId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all captures included in the given settlement.
   *
   * The response is in the same format as the response of the [List captures endpoint](https://docs.mollie.com/reference/list-captures).
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/list-settlement-captures
   */
  public iterate(parameters: IterateParameters) {
    const { settlementId, valuesPerMinute, ...query } = foldParameters(parameters, { embed: ['include'] });
    return this.networkClient.iterate<CaptureData, Capture>(getPathSegments(settlementId), 'captures', query, valuesPerMinute);
  }
}
