import { IShipmentTracking } from '../shipment';
import { IOrderLine } from '../order/line';

/**
 * Create Shipment parameters
 *
 * @param orderId - Corresponding Order ID
 * @param lines - An array of objects containing the order line details you want to create a shipment for. If you send an empty array, the entire order will be shipped. If the order is already partially shipped, any remaining lines will be shipped.
 * @param tracking - An object containing tracking details for the shipment. When sent, the carrier and code parameters become required for this endpoint.
 *
 * @param testmode - Set this to `true` to make this order a test shipment.
 *
 * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment
 */
export interface ICreateParams {
  orderId: string;

  lines: Array<IOrderLine>;
  tracking?: IShipmentTracking;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Retrieve Shipment parameters
 *
 * @param orderId - Corresponding Order ID
 *
 * @param testmode - Set this to `true` to retrieve a test mode shipment.
 *
 * @see https://docs.mollie.com/reference/v2/shipments-api/get-shipment
 */
export interface IGetParams {
  orderId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Shipments parameters
 *
 * @param orderId - Corresponding Order ID
 *
 * @param testmode - Set this to `true` to list all shipments available in test mode.
 */
export interface IListParams {
  orderId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Update Shipment parameters
 *
 * @param orderId - Corresponding Order ID
 * @param tracking - Updated shipment tracking
 *
 * @param testmode - Set this to `true` to update a test mode shipment.
 */
export interface IUpdateParams {
  orderId: string;
  tracking: IShipmentTracking;

  // Access token parameters
  testmode?: boolean;
}
