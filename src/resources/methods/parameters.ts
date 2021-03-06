import { Amount, Locale, SequenceType } from '../../data/global';
import { MethodInclude } from '../../data/methods/data';

export interface GetParameters {
  /**
   * Passing a locale will translate the payment method name in the corresponding language.
   *
   * Possible values: `en_US` `nl_NL` `nl_BE` `fr_FR` `fr_BE` `de_DE` `de_AT` `de_CH` `es_ES` `ca_ES` `pt_PT` `it_IT` `nb_NO` `sv_SE` `fi_FI` `da_DK` `is_IS` `hu_HU` `pl_PL` `lv_LV` `lt_LT`
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=locale#parameters
   */
  locale?: Locale;
  include?: MethodInclude[] | MethodInclude;
  profileId?: string;
  testmode?: boolean;
  /**
   * The currency to receiving the `minimumAmount` and `maximumAmount` in. We will return an error when the currency is not supported by the payment method.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method?path=currency#parameters
   */
  currency?: string;
}

/**
 * Retrieve all enabled payment methods. The results are not paginated.
 *
 * -   For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
 * -   For live mode, payment methods are returned that have been activated on your account and have been enabled in the Dashboard.
 *
 * New payment methods can be activated via the Enable payment method endpoint in the Profiles API.
 *
 * When using the `first` sequence type, methods will be returned if they can be used as a first payment in a recurring sequence and if they are enabled in the Dashboard.
 *
 * When using the `recurring` sequence type, payment methods that can be used for recurring payments or subscriptions will be returned. Enabling / disabling methods in the dashboard does not affect
 * how they can be used for recurring payments.
 *
 * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
 */
export interface ListParameters {
  /**
   * Passing `first` will only show payment methods eligible for making a first payment. Passing `recurring` shows payment methods which can be used to automatically charge your customer's account
   * when authorization has been given. Set to `oneoff` by default, which indicates the payment method is available for a regular non-recurring payment.
   *
   * Possible values: `oneoff` `first` `recurring`
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods?path=sequenceType#parameters
   */
  sequenceType?: SequenceType;
  /**
   * Passing a locale will sort the payment methods in the preferred order for the country, and translate the payment method names in the corresponding language.
   *
   * Possible values: `en_US` `nl_NL` `nl_BE` `fr_FR` `fr_BE` `de_DE` `de_AT` `de_CH` `es_ES` `ca_ES` `pt_PT` `it_IT` `nb_NO` `sv_SE` `fi_FI` `da_DK` `is_IS` `hu_HU` `pl_PL` `lv_LV` `lt_LT`
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods?path=locale#parameters
   */
  locale?: Locale;
  /**
   * An object containing `value` and `currency`. Only payment methods that support the amount and currency are returned.
   *
   * Example: `https://api.mollie.com/v2/methods?amount[value]=100.00&amount[currency]=USD`
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods?path=amount#parameters
   */
  amount?: Amount;
  /**
   * Use the `resource` parameter to indicate if you will use the result with the Create Order or Create
   * Payment API.
   *
   * For example: when passing `orders` the result will include payment methods that can only be used in conjunction with orders, such as *Klarna Pay later* and meal vouchers. Default behaviour is
   * returning all available payment methods for `payments`.
   *
   * Possible values: `orders` `payments`.
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods?path=resource#parameters
   */
  resource?: string;
  /**
   * The billing country of your customer in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. This parameter can be used to check whether your customer is eligible for
   * certain payment methods, for example *Klarna Slice it*.
   *
   * Example: `https://api.mollie.com/v2/methods?resource=orders&billingCountry=DE`
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods?path=billingCountry#parameters
   */
  billingCountry?: string;
  include?: MethodInclude[] | MethodInclude;
  profileId?: string;
  testmode?: boolean;
}
