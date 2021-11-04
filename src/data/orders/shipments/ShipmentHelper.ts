import renege from '../../../plumbing/renege';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import Callback from '../../../types/Callback';
import Helper from '../../Helper';
import Shipment, { ShipmentData } from '../../orders/shipments/Shipment';
import { OrderData } from '../data';
import Order from '../Order';

export default class ShipmentHelper extends Helper<ShipmentData, Shipment> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: ShipmentData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the order this shipment was created for.
   *
   * @since 3.6.0
   */
  public getOrder(): Promise<Order>;
  public getOrder(callback: Callback<Array<Order>>): void;
  public getOrder() {
    if (renege(this, this.getOrder, ...arguments)) return;
    return this.networkClient.get<OrderData, Order>(this.links.order.href);
  }
}
