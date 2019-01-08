import { Locale } from '../global';

/**
 * Create Customer parameters.
 *
 * @param name - The full name of the customer.
 * @param email - The email address of the customer.
 * @param locale - Allows you to preset the language
 *                 to be used in the hosted payment
 *                 pages shown to the consumer.
 *                 When this parameter is not provided,
 *                 the browser language will be used
 *                 instead in the payment flow
 *                 (which is usually more accurate).
 * @param metadata - Provide any data you like,
 *                   and we will save the data alongside
 *                   the customer.
 *                   Whenever you fetch the customer with
 *                   our API, we’ll also include the metadata.
 *                   You can use up to 1kB of JSON.
 * @param testmode - Set this to true to create a test mode customer.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/create-customer
 */
export interface ICreateParams {
  name?: string;
  email?: string;
  locale?: Locale;
  metadata?: any;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Retrieve Customer parameters.
 *
 * @param testmode -
 */
export interface IGetParams {
  // Access token parameters
  testmode?: boolean;
}

export interface IUpdateParams {
  name?: string;
  email?: string;
  locale?: Locale;
  metadata?: any;

  // Access token parameters
  testmode?: boolean;
}

export interface IDeleteParams {
  // Access token parameters
  testmode?: boolean;
}

export interface IListParams {
  from?: string;
  limit?: number;
}
