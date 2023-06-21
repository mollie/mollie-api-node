import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import type Capture from '../../../data/payments/captures/Capture';
import { type CaptureData } from '../../../data/payments/captures/data';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `settlements/${settlementId}/captures`;
}

export default class SettlementCapturesBinder extends Binder<CaptureData, Capture> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all captures in a certain settlement.
   *
   * Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment that have this flow are *Klarna Pay now*, *Klarna Pay later* and *Klarna Slice
   * it*. Captures are created when (part of) an Order is shipped. The capture is then settled to the merchant.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-captures
   */
  public page(parameters: PageParameters): Promise<Page<Capture>>;
  public page(parameters: PageParameters, callback: Callback<Page<Capture>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = parameters;
    return this.networkClient.page<CaptureData, Capture>(getPathSegments(settlementId), 'captures', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all captures in a certain settlement.
   *
   * Captures are used for payments that have the *authorize-then-capture* flow. The only payment methods at the moment that have this flow are *Klarna Pay now*, *Klarna Pay later* and *Klarna Slice
   * it*. Captures are created when (part of) an Order is shipped. The capture is then settled to the merchant.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-captures
   */
  public iterate(parameters: IterateParameters) {
    const { settlementId, valuesPerMinute, ...query } = parameters;
    return this.networkClient.iterate<CaptureData, Capture>(getPathSegments(settlementId), 'captures', query, valuesPerMinute);
  }
}
