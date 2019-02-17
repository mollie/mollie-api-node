import { MandateMethod } from '@mollie-types/mandate';

/**
 * Create Mandate parameters
 *
 * @param customerId - Corresponding Customer ID
 * @param method - Payment method of the mandate.
 * @param consumerName - The consumer’s name.
 * @param consumerAccount - The consumer’s IBAN.
 * @param consumerBic - The consumer’s bank’s BIC.
 * @param signatureDate - The date when the mandate was signed in `YYYY-MM-DD` format.
 * @param mandateReference - A custom mandate reference.
 *
 * @param testmode - Set this to `true` to create a test mode mandate.
 *
 * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate
 */
export interface ICreateParams {
  customerId: string;

  method: MandateMethod;
  consumerName: string;
  consumerAccount: string;
  consumerBic?: string;
  signatureDate?: string;
  mandateReference?: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Retrieve Mandate parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param testmode - Set this to `true` to retrieve a test mode mandate.
 *
 * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
 */
export interface IGetParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Mandate parameters
 *
 * @param customerId - Corresponding Customer ID
 * @param from - Offset the result set to the mandate with this ID. The mandate with this ID is included in the result
 *               set as well.
 * @param limit - The number of mandates to return (with a maximum of 250).
 *
 * @param testmode - Set this to true to only retrieve mandates made in test mode. By default, only live mandates
 *                   are returned.
 *
 * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
 */
export interface IListParams {
  customerId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Revoke Mandate parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param testmode - Set this to `true` to revoke a test mode mandate.
 *
 * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
 */
export interface IRevokeParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}
