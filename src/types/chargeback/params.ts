/**
 * List Chargebacks parameters
 *
 * @param from - Offset the result set to the chargeback with this ID. The chargeback with this ID is included in the
 *               result set as well.
 * @param limit - The number of chargebacks to return (with a maximum of 250).
 *
 * @param embed - This endpoint allows for embedding additional information by appending the following values via the
 *                embed query string parameter.
 *
 * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
 */
import { PaymentChargebackEmbed } from '../payment/chargeback';

export interface IListParams {
  from?: string;
  limit?: number;

  embed?: Array<PaymentChargebackEmbed>;
}
