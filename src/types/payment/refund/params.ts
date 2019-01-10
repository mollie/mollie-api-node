import { IAmount } from '../../global';
import { RefundEmbed } from '../../refund';

/**
 * Create Payment Refund parameters.
 *
 * @param amount - The amount to refund. For some payments,
 *                 it can be up to €25.00 more than the original
 *                 transaction amount.
 * @param description - The description of the refund you are
 *                      creating. This will be shown to the consumer
 *                      on their card or bank statement when possible.
 *                      Max. 140 characters.
 * @param paymentId - The corresponding Payment ID
 *
 * @param testmode - Set this to true to refund a test mode payment.
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/create-refund
 */
export interface ICreateParams {
  paymentId: string;

  amount: IAmount;
  description?: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Retrieve Payment Refund parameters.
 *
 * @param paymentId - The corresponding Payment ID
 * @param embed - This endpoint allows for embedding additional information by appending the following values via the embed query string parameter.
 *
 * @param testmode - Set this to `true` to get a refund made in test mode. If you omit this parameter, you can only retrieve live mode refunds.
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
 */
export interface IGetParams {
  paymentId: string;
  embed?: Array<RefundEmbed>;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Payment Refunds parameters.
 *
 * @param paymentId - The corresponding Payment ID
 *
 * @param from - Offset the result set to the refund with this ID. The refund with this ID is included in the result set as well.
 * @param limit - The number of refunds to return (with a maximum of 250).
 *
 * @param embed - This endpoint allows for embedding additional information by appending the following values via the embed query string parameter.
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`.
 * @param testmode - Set this to true to only retrieve refunds made in test mode. By default, only live payments are returned.
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
 */
export interface IListParams {
  paymentId: string;

  from?: string;
  limit?: number;

  embed?: Array<RefundEmbed>;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}

/**
 * Cancel Payment Refund parameters.
 *
 * @param paymentId - The corresponding Payment ID
 *
 * @param testmode - Set this to true to cancel a test mode refund.
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
 */
export interface ICancelParams {
  paymentId: string;

  // Access token parameters
  testmode?: boolean;
}
