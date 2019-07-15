/**
 * Update Order Line parameters
 *
 * This endpoint can be used to update the order line. Only the lines that belong to an order with status `created`,
 * `pending` or `authorized` can be updated.
 * When updating an order line that uses a pay after delivery method such as Klarna Pay later, Klarna may decline the
 * requested changes, resulting in an error response from the Mollie API. The order remains intact, though the requested
 * changes are not persisted.
 *
 * @param orderId - Corresponding Order ID
 * @param name - A description of the order line, for example LEGO 4440 Forest Police Station.
 * @param imageUrl - A link pointing to an image of the product sold.
 * @param productUrl - A link pointing to the product page in your web shop of the product sold.
 *
 * @param testmode - Set this to `true` to update a test mode order line.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/update-orderline
 */
import { IOrderLine } from './index';
import { IAmount } from '../../global';

export interface IUpdateParams {
  orderId: string;

  name?: string;
  imageUrl?: string;
  productUrl?: string;
  quantity?: number;
  unitPrice?: IAmount;
  discountAmount?: IAmount;
  totalAmount?: IAmount;
  vatAmount?: IAmount;
  vatRate?: IAmount;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Cancel Order Line(s) parameters
 *
 * @param orderId - Corresponding Order ID
 *
 * @param lines - An array of objects containing the order line details you want to cancel.
 *
 * @param testmode - Set this to `true` to cancel test mode order lines.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
 */
export interface ICancelParams {
  orderId: string;

  lines: Array<IOrderLine>;

  // Access token parameters
  testmode?: boolean;
}
