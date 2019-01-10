/**
 * Create Order Refund parameters.
 *
 * @param orderId - Corresponding Order ID
 * @param lines - An array of objects containing the order line details you want to create a refund for. If you send an empty array, the entire order will be refunded.
 * @param description - The description of the refund you are creating. This will be shown to the consumer on their card or bank statement when possible. Max. 140 characters.
 *
 * @param testmode - Set this to `true` to create a test mode order refund.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/create-order-refund
 */
import { IRequestOrderLine } from '../line';

export interface ICreateParams {
  orderId: string;

  lines: Array<IRequestOrderLine>;
  description?: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Order Refunds parameters.
 *
 * @param orderId - Corresponding Order ID
 * @param from - Offset the result set to the refund with this ID. The refund with this ID is included in the result set as well.
 * @param limit - The number of refunds to return (with a maximum of 250).
 *
 * @param testmode - Set this to `true` to list test mode order refunds.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/list-order-refunds
 */
export interface IListParams {
  orderId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}
