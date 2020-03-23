import { Amount, Locale } from '../../data/global';
import { MethodInclude } from '../../data/methods/data';
import { SequenceType } from '../../../ol_dist/types/src/types/global';

/**
 * Get Method parameters
 *
 * @param locale - Passing a locale will translate the payment method name in
 *                the corresponding language.
 * @param include - This endpoint allows you to include additional information.
 *
 * @param profileId - The website profile’s unique identifier, for example
 *                    `pfl_3RkSN1zuPE`. This field is mandatory.
 * @param testmode -Set this to true to list all methods available in testmode.
 *
 * @see https://docs.mollie.com/reference/v2/methods-api/get-method
 */
export interface GetParameters {
  locale?: Locale;
  include?: MethodInclude[] | MethodInclude;
  profileId?: string;
  testmode?: boolean;
}

/**
 * List Methods parameters
 *
 * @param sequenceType - Passing first will only show payment methods eligible
 *                       for making a first payment. Passing recurring shows
 *                       payment methods which can be used to automatically
 *                       charge your customer’s account when authorization has
 *                       been given. Set to `oneoff` by default, which indicates
 *                       the payment method is available for a regular
 *                       non-recurring payment.
 * @param locale - Passing a locale will sort the payment methods in the preferred
 *                 order for the country, and translate the payment method names
 *                 in the corresponding language.
 * @param amount - An object containing value and currency. Only payment methods
 *                 that support the amount and currency are returned.
 * @param resource - Use the resource parameter to indicate if you will use the
 *                   result with the Create Order or Create Payment API. For example:
 *                   when passing orders the result will include payment methods that
 *                   can only be used in conjunction with orders, such as
 *                   Klarna Pay later. Default behaviour is returning all
 *                   available payment methods for payments.
 * @param billingCountry - The billing country of your customer in ISO 3166-1 alpha-2
 *                         format. This parameter can be used to check whether your
 *                         customer is eligible for certain payment methods,
 *                         for example Klarna Slice it.
 * @param include - This endpoint allows you to include additional information.
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`.
 *                    This field is mandatory.
 * @param testmode - Set this to `true` to list all payment methods available in testmode.
 *
 * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
export interface ListParameters {
  sequenceType?: SequenceType;
  locale?: Locale;
  amount?: Amount;
  resource?: string;
  billingCountry?: string;
  include?: MethodInclude[] | MethodInclude;
  profileId?: string;
  testmode?: boolean;
}
