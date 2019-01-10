import { ILinks, IUrl } from '../global';
import { IOrderLine } from '../order/line';

/**
 * Shipment Response object.
 *
 * @param resource - Indicates the response contains a shipment object. Will always contain shipment for this endpoint.
 * @param id - The shipment’s unique identifier, for example `shp_3wmsgCJN4U`.
 * @param orderId - The order this shipment was created on, for example `ord_8wmqcHMN4U`.
 * @param createdAt - The shipment’s date and time of creation, in ISO 8601 format.
 * @param tracking - @see {@link IShipmentTracking}
 * @param lines - An array of {@link IOrderLine order line objects} as described in {@link https://docs.mollie.com/reference/v2/shipments-api/get-shipment Get order}.
 *                The lines will show the quantity, discountAmount, vatAmount and totalAmount shipped in this shipment.
 *                If the line was partially shipped, these values will be different from the values in response from the
 *                Get order API.
 * @param _links - An object with several URL objects relevant to the shipment.
 *
 * @see https://docs.mollie.com/reference/v2/shipments-api/get-shipment
 */
export interface IShipment {
  resource: string;
  id: string;
  orderId: string;
  createdAt: string;
  tracking: IShipmentTracking | null;
  lines: Array<IOrderLine>;
  _links: IShipmentLinks;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Shipments _links object
 *
 * @param order - The resource URL of the order this shipment was created for.
 */
export interface IShipmentLinks extends ILinks {
  order: IUrl;
}

/**
 * An object containing shipment tracking details.
 * Will be omitted when no tracking details are available.
 *
 * @param carrier - The name of the postal carrier.
 * @param code - The track and trace code for the shipment.
 * @param url - The URL where your customer can track the shipment.
 */
export interface IShipmentTracking {
  carrier: string;
  code: string;
  url?: string;
}
