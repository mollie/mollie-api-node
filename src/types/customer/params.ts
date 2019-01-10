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
 * @param testmode - Set this to `true` to retrieve a test mode customer.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
export interface IGetParams {
  // Access token parameters
  testmode?: boolean;
}

/**
 * Update Customer parameters
 *
 * @param name - The full name of the customer.
 * @param email - The email address of the customer.
 * @param locale - Allows you to preset the language to be used in the hosted payment pages shown to the consumer.
 *                 When this parameter is not provided, the browser language will be used instead in the payment flow
 *                 (which is usually more accurate).
 * @param metadata - Provide any data you like, and we will save the data alongside the customer. Whenever you fetch
 *                   the customer with our API, we’ll also include the metadata. You can use up to 1kB of JSON.
 *
 * @param testmode - Set this to true to update a test mode customer.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/update-customer
 */
export interface IUpdateParams {
  name?: string;
  email?: string;
  locale?: Locale;
  metadata?: any;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Delete Customer parameters
 *
 * @param testmode - Set this to `true` to delete a test mode customer.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
 */
export interface IDeleteParams {
  // Access token parameters
  testmode?: boolean;
}

/**
 * List Customers parameters
 *
 * @param from - Offset the result set to the customer with this ID. The customer with this ID is included in the
 *               result set as well.
 * @param limit - The number of customers to return (with a maximum of 250).
 *
 * @testmode - Set this to `true` to list test mode customers.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
 */
export interface IListParams {
  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}
