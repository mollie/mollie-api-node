/**
 * List Subscription Payments parameters
 *
 * @param customerId - Corresponding Customer ID
 * @param subscriptionId - Corresponding Subscription ID
 *
 * @param from - Offset the result set to the payment with this ID. The payment with this ID is included in the result set as well.
 * @param limit - The number of payments to return (with a maximum of 250).
 *
 * @param testmode - Set this to `true` to retrieve test mode payments.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
 */
export interface IListParams {
  customerId: string;
  subscriptionId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  testmode?: boolean;
}
