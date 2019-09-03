import { ILinks, IUrl, IAmount } from '../global';
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
  lines: IOrderLine[];
  _links: IShipmentLinks;

  // Access token parameters
  testmode?: boolean;
}

/**
 * @param id - The API resource token of the order line, for example: `odl_jp31jz`.
 * @param quantity - The number of items that should be shipped for this order line. When this parameter is omitted,
 *                   the whole order line will be shipped.
 *
 *                   Must be less than the number of items already shipped for this order line.
 * @param amount - The amount that you want to ship. In almost all cases, Mollie can determine the amount
 *                 automatically.
 *
 *                 The amount is required only if you are partially shipping an order line which has a non-zero
 *                 `discountAmount`.
 *
 *                 The amount you can ship depends on various properties of the order line and the create shipment
 *                 request. The maximum that can be shipped is unit price x quantity to ship.
 *
 *                 The minimum amount depends on the discount applied to the line, the quantity already shipped or
 *                 canceled, the amounts already shipped or canceled and the quantity you want to ship.
 *
 *                 If you do not send an amount, Mollie will determine the amount automatically or respond with an
 *                 error if the amount cannot be determined automatically.
 */
export interface ICreateShipmentOrderLine {
  id: string;
  quantity?: number;
  amount?: IAmount;
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
