/**
 * Retrieve Capture parameters
 *
 * @param testmode - Set this to `true` to retrieve a test mode capture.
 */
export interface IGetParams {
  // Access token parameters
  testmode?: boolean;
}

/**
 * List Captures parameters
 *
 * @param testmode - Set this to `true` to retrieve captures for a test mode payment.
 */
export interface IListParams {
  // Access token parameters
  testmode?: boolean;
}
