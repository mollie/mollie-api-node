import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import breakUrl from '../../../communication/breakUrl';
import renege from '../../../plumbing/renege';
import resolveIf from '../../../plumbing/resolveIf';
import undefinedPromise from '../../../plumbing/undefinedPromise';
import type Callback from '../../../types/Callback';
import type Maybe from '../../../types/Maybe';
import Helper from '../../Helper';
import type Shipment from '../../orders/shipments/Shipment';
import { type ShipmentData } from '../../orders/shipments/Shipment';
import type { Settlement, SettlementData } from '../../settlements/data';
import type Payment from '../Payment';
import { type PaymentData } from '../data';
import type Capture from './Capture';
import { type CaptureData } from './data';

export default class CaptureHelper extends Helper<CaptureData, Capture> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: CaptureData['_links'],
    protected readonly embedded: Capture['_embedded'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the payment the capture was created for.
   *
   * @since 3.6.0
   */
  public getPayment(): Promise<Payment>;
  public getPayment(callback: Callback<Array<Payment>>): void;
  public getPayment() {
    if (renege(this, this.getPayment, ...arguments)) return;
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(...breakUrl(this.links.payment.href));
  }

  /**
   * Returns the shipment that triggered the capture to be created (if any).
   *
   * @since 3.6.0
   */
  public getShipment(): Promise<Shipment> | Promise<undefined>;
  public getShipment(callback: Callback<Maybe<Shipment>>): void;
  public getShipment() {
    if (renege(this, this.getShipment, ...arguments)) return;
    return (
      runIf(
        this.links.shipment,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.get<ShipmentData, Shipment>(pathname, query),
      ) ?? undefinedPromise
    );
  }

  /**
   * Returns the settlement this capture has been settled with (if any).
   *
   * @since 4.1.0
   */
  public getSettlement(): Promise<Settlement> | Promise<undefined>;
  public getSettlement(callback: Callback<Maybe<Settlement>>): void;
  public getSettlement() {
    if (renege(this, this.getSettlement, ...arguments)) return;
    return (
      runIf(
        this.links.settlement,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.get<SettlementData, Settlement>(pathname, query),
      ) ?? undefinedPromise
    );
  }
}
