import { SequenceType } from '@mollie-types/global';

/**
 * Create Customer Payment parameters
 *
 * @param customerId - Corresponding Customer ID
 * @param sequenceType - Enables recurring payments. If set to `first`, a first payment for the customer is created,
 *                       allowing the customer to agree to automatic recurring charges taking place on their account
 *                       in the future. If set to `recurring`, the customer is charged automatically.
 * @param redirectUrl - If the {@link sequenceType} parameter is set to `recurring`, this parameter can be omitted.
 *                      Since the payment will take place without customer interaction, a redirect is not needed.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
export interface ICreateParams {
  customerId: string;

  sequenceType?: SequenceType;
  redirectUrl?: string;
}

/**
 * List Customer Payment parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
 */
export interface IListParams {
  customerId: string;
}
