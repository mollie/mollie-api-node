import { Links, Url } from '../../global';
import Model from '../../Model';
import OrderLine, { OrderLineData, injectPrototypes as injectOrderLinePrototypes } from '../orderlines/OrderLine';
import Seal from '../../../types/Seal';
import commonHelpers from '../../commonHelpers';

export interface ShipmentData extends Model<'shipment'> {
  orderId: string;
  createdAt: string;
  /**
   * An object containing shipment tracking details.
   */
  tracking?: ShipmentTracking;
  lines: OrderLineData[];
  _links: ShipmentLinks;
}

type Shipment = Seal<ShipmentData & { lines: OrderLine[] }, typeof commonHelpers>;

export default Shipment;

/**
 * Shipments _links object
 *
 * @param order - The resource URL of the order this shipment was created for.
 */
export interface ShipmentLinks extends Links {
  order: Url;
}

export interface ShipmentTracking {
  /**
   * Name of the postal carrier (as specific as possible). For example `'PostNL'`.
   */
  carrier: string;
  /**
   * The track and trace code of the shipment. For example `'3SKABA000000000'`.
   */
  code: string;
  /**
   * The URL where your customer can track the shipment, for example:
   * `'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C'`.
   */
  url?: string;
}

export function injectPrototypes(input: ShipmentData): Shipment {
  return Object.assign(Object.create(commonHelpers), input, {
    lines: input.lines.map(injectOrderLinePrototypes),
  });
}
