import { IAmount } from '../../types/global';
import { MandateMethod } from '../mandate';
import { ISubscription } from '../subscription';

/**
 * Create Subscription parameters
 *
 * @param customerId - Corresponding Customer ID
 * @param amount - The amount that you want to charge, e.g. `{"currency":"EUR", "value":"100.00"}` if you would want to
 *                 charge €100.00.
 * @param times - Total number of charges for the subscription to complete. Leave empty for an ongoing subscription.
 * @param interval - Interval to wait between charges, for example `1 month` or `14 days`.
 *                   Possible values: `... months` `... weeks` `... days`
 * @param startDate - The start date of the subscription in `YYYY-MM-DD` format.
 *                    This is the first day on which your customer will be charged. When this parameter is not provided,
 *                    the current date will be used instead.
 * @param description - A description unique per subscription . This will be included in the payment description along
 *                      with the charge date.
 * @param method - The payment method used for this subscription, either forced on creation or `null` if any of the
 *                 customer’s valid mandates may be used. Please note that this parameter can not set together with
 *                 `mandateId`.
 * @param mandateId - The mandate used for this subscription. Please note that this parameter can not set together
 *                    with `method`.
 * @param webhookUrl - Use this parameter to set a webhook URL for all subscription payments.
 * @param metadata - Provide any data you like, and we will save the data alongside the subscription. Whenever you fetch
 *                   the subscription with our API, we’ll also include the metadata. You can use up to 1kB of JSON.
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`. This field is mandatory.
 * @param testmode - Set this to `true` to create a test mode subscription.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription#
 */
export interface ICreateParams {
  customerId: string;

  amount: IAmount;
  times?: number;
  interval: string;
  startDate?: string;
  description: string;
  method: MandateMethod | null;
  mandateId?: string;
  webhookUrl?: string;
  metadata?: string;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}

/**
 * Retrieve Subscription parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param testmode - Set this to `true` to retrieve a test mode subscription.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
 */
export interface IGetParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Update Subscription parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param amount - The amount that you want to charge, e.g. `{"currency":"EUR", "value":"100.00"}` if you would want to
 *                 change the charge to €100.00.
 * @param times - Total number of charges for the subscription to complete. Can not be less than number of times that
 *                subscription has been charged.
 * @param startDate - The start date of the subscription in `YYYY-MM-DD` format. This is the first day on which your
 *                    customer will be charged. Should always be in the future.
 * @param description - A description unique per subscription . This will be included in the payment description
 *                      along with the charge date.
 * @param mandateId - Use this parameter to set a specific mandate for all subscription payments. If you set a `method`
 *                    before, it will be changed to `null` when setting this parameter.
 * @param webhookUrl - Use this parameter to set a webhook URL for all subscription payments.
 * @param metadata - Provide any data you like, and we will save the data alongside the subscription. Whenever you fetch
 *                   the subscription with our API, we’ll also include the metadata. You can use up to 1kB of JSON.
 *
 * @param testmode - Set this to `true` to update a test mode subscription.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
 */
export interface IUpdateParams extends ISubscription {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Cancel Subscription parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param testmode - Set this to `true` to cancel a test mode subscription.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
 */
export interface ICancelParams {
  customerId: string;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Subscriptions parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @param from - Offset the result set to the subscription with this ID. The subscription with this ID is included in
 *               the result set as well.
 * @param limit - The number of subscriptions to return (with a maximum of 250).
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`. This field is mandatory.
 * @param testmode - Set this to `true` to retrieve test mode subscriptions.
 *
 * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
 */
export interface IListParams {
  customerId: string;

  from?: string;
  limit?: number;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}
