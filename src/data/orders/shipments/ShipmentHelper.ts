import breakUrl from '../../../communication/breakUrl';
import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Helper from '../../Helper';
import type Shipment from '../../orders/shipments/Shipment';
import { type ShipmentData } from '../../orders/shipments/Shipment';
import { type OrderData } from '../data';
import type Order from '../Order';

export default class ShipmentHelper extends Helper<ShipmentData, Shipment> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: ShipmentData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the order this shipment was created for.
   *
   * @since 3.6.0
   */
  public getOrder(): Promise<Order>;
  public getOrder(callback: Callback<Order>): void;
  public getOrder() {
    if (renege(this, this.getOrder, ...arguments)) return;
    return this.networkClient.get<OrderData, Order>(...breakUrl(this.links.order.href));
  }
}
