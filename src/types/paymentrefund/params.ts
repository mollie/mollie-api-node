import { IAmount } from '../global';

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
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
 */
export interface IGetParams {
  paymentId: string;
}

/**
 * List Payment Refunds parameters.
 *
 * @param paymentId - The corresponding Payment ID
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
 */
export interface IListParams {
  paymentId: string;
}

/**
 * Cancel Payment Refund parameters.
 *
 * @param paymentId - The corresponding Payment ID
 *
 * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
 */
export interface ICancelParams {
  paymentId: string;
}
