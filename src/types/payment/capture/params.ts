/**
 * Retrieve Capture parameters
 *
 * @param paymentId - Corresponding Payment ID
 *
 * @param testmode - Set this to `true` to retrieve a test mode capture.
 */
export interface IGetParams {
  paymentId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Captures parameters
 *
 * @param paymentId - Corresponding Payment ID
 *
 * @param testmode - Set this to `true` to retrieve captures for a test mode payment.
 */
export interface IListParams {
  paymentId: string;

  // Access token parameters
  testmode?: boolean;
}
