import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import renege from '../../../plumbing/renege';
import resolveIf from '../../../plumbing/resolveIf';
import undefinedPromise from '../../../plumbing/undefinedPromise';
import Callback from '../../../types/Callback';
import Helper from '../../Helper';
import Shipment, { ShipmentData } from '../../orders/shipments/Shipment';
import { PaymentData } from '../data';
import Payment from '../Payment';
import Capture from './Capture';
import { CaptureData } from './data';

export default class CaptureHelper extends Helper<CaptureData, Capture> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: CaptureData['_links'], protected readonly embedded: Capture['_embedded']) {
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
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(this.links.payment.href);
  }

  /**
   * Returns the shipment that triggered the capture to be created.
   *
   * @since 3.6.0
   */
  public getShipment(): Promise<Shipment> | Promise<undefined>;
  public getShipment(callback: Callback<Shipment | undefined>): void;
  public getShipment() {
    if (renege(this, this.getShipment, ...arguments)) return;
    if (this.links.shipment == undefined) {
      return undefinedPromise;
    }
    return this.networkClient.get<ShipmentData, Shipment>(this.links.shipment.href);
  }
}
