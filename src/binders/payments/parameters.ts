import { type Address, type Amount, type DestinationType, type PaymentMethod } from '../../data/global';
import { type Issuer } from '../../data/Issuer';
import { type PaymentData, type PaymentEmbed, type PaymentInclude } from '../../data/payments/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<PaymentData, 'amount' | 'description' | 'redirectUrl' | 'cancelUrl' | 'webhookUrl' | 'customerId' | 'mandateId'> &
  PickOptional<PaymentData, 'locale' | 'metadata' | 'sequenceType'> & {
    /**
     * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment method and your customer will skip the selection screen and is sent directly to
     * the chosen payment method. The parameter enables you to fully integrate the payment method selection into your website.
     *
     * You can also specify the methods in an array. By doing so we will still show the payment method selection screen but will only show the methods specified in the array. For example, you can use
     * this functionality to only show payment methods from a specific country to your customer `['bancontact', 'belfius']`.
     *
     * Possible values: `applepay` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `kbc` `mybank` `paypal` `paysafecard` `przelewy24` `sofort`
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=method#parameters
     */
    method?: PaymentMethod | PaymentMethod[];
    /**
     * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT rates you have used for the order to ensure your customer's country matches the
     * VAT country.
     *
     * Use this parameter to restrict the payment methods available to your customer to those from a single country.
     *
     * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
     *
     * The field expects a country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example <span class="title-ref">NL</span>.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=restrictPaymentMethodsToCountry#parameters
     */
    restrictPaymentMethodsToCountry?: string;
    /**
     * The [Apple Pay Payment Token](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment/1916095-token) object (encoded as JSON) that is part of the result of authorizing a
     * payment request. The token contains the payment information needed to authorize the payment.
     *
     * The object should be passed encoded in a JSON string. Example:
     *
     * `{"paymentData": {"version": "EC_v1", "data": "vK3BbrCbI/...."}}`
     *
     * For documentation on how to get this token, see /wallets/applepay-direct-integration.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applePayPaymentToken#apple-pay
     */
    applePayPaymentToken?: string;
    billingEmail?: string;
    /**
     * The date the payment should expire, in `YYYY-MM-DD` format. **Note:** the minimum date is tomorrow and the maximum date is 100 days after tomorrow.
     *
     * After you created the payment, you can still update the `dueDate` via /reference/v2/payments-api/update-payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=dueDate#bank-transfer
     */
    dueDate?: string;
    /**
     * The card holder's address details. We advise to provide these details to improve the credit card fraud protection, and thus improve conversion.
     *
     * If an address is provided, then the address has to be in a valid format. See the address object documentation for more information on which formats are accepted.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=billingAddress#credit-card
     */
    billingAddress?: Address;
    /**
     * The card token you got from Mollie Components. The token contains the card information (such as card holder, card number, and expiry date) needed to complete the payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=cardToken#credit-card
     */
    cardToken?: string;
    shippingAddress?: Address & {
      // Note that this field is required for PayPal payments; but is disregarded for credit card payments.
      givenName?: string;
      // Note that this field is required for PayPal payments; but is disregarded for credit card payments.
      familyName?: string;
    };
    issuer?: Issuer;
    /**
     * The card number on the gift card. You can supply this to prefill the card number.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=voucherNumber#gift-cards
     */
    voucherNumber?: string;
    /**
     * The PIN code on the gift card. You can supply this to prefill the PIN, if the card has any.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=voucherPin#gift-cards
     */
    voucherPin?: string;
    /**
     * The unique ID you have used for the PayPal fraud library. You should include this if you use PayPal for an on-demand payment. The maximum character length is 32.
     *
     * Refer to the Recurring payments guide for more information on how to implement the fraud library.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=sessionId#paypal-method-details
     */
    sessionId?: string;
    /**
     * Indicate if you are about to deliver digital goods, like for example a license. Setting this parameter can have consequences for your Seller Protection by PayPal. See [PayPal's help
     * article](https://www.paypal.com/us/brc/article/seller-protection) about Seller Protection for more information.
     *
     * Default: `false`
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=digitalGoods#paypal-method-details
     */
    digitalGoods?: boolean;
    /**
     * Used for consumer identification. Use the following guidelines to create your `customerReference`:
     *
     * -   Has to be unique per shopper
     * -   Has to remain the same for one shopper
     * -   Should be as disconnected from personal data as possible
     * -   Must not contain customer sensitive data
     * -   Must not contain the timestamp
     * -   Must not contain the IP address
     *
     * Due to data privacy regulations, make sure not to use any personal identifiable information in this parameter.
     *
     * If not provided, Mollie will send a hashed version of the shopper IP address.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=customerReference#paysafecard
     */
    customerReference?: string;
    /**
     * Beneficiary name of the account holder. Only available if one-off payments are enabled on your account. Supplying this field will pre-fill the beneficiary name in the checkout screen.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=consumerName#sepa-direct-debit
     */
    consumerName?: string;
    /**
     * IBAN of the account holder. Only available if one-off payments are enabled on your account. Supplying this field will pre-fill the IBAN in the checkout screen.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=consumerAccount#sepa-direct-debit
     */
    consumerAccount?: string;
    include?: PaymentInclude[] | PaymentInclude;
    profileId?: string;
    testmode?: boolean;
    /**
     * With Mollie Connect you can charge fees on payments that your app is processing on behalf of other Mollie merchants.
     *
     * If you use OAuth to create payments on a connected merchant's account, you can charge a fee using this applicationFee parameter.
     * If the payment succeeds, the fee will be deducted from the merchant's balance and sent to your own account balance.
     *
     * If instead you want to split a payment on your own account between yourself and a connected merchant, refer to the `routing` parameter.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee#mollie-connect-parameters
     */
    applicationFee?: {
      /**
       * The fee that the app wants to charge, e.g. `{"currency":"EUR", "value":"10.00"}` if the app would want to charge €10.00.
       *
       * There need to be enough funds left from the payment to deduct the Mollie payment fees as well. For example, you cannot charge a €0.99 fee on a €1.00 payment. The API will return an error if
       * the requested application fee is too high for the specific payment amount and method.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee/amount#mollie-connect-parameters
       */
      amount: Amount;
      /**
       * The description of the application fee. This will appear on settlement reports to the merchant and to you.
       *
       * The maximum length is 255 characters.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee/description#mollie-connect-parameters
       */
      description: string;
    };
    /**
     * _This functionality is not enabled by default. Reach out to our partner management team if you wish to use it._
     *
     * With Mollie Connect you can charge fees on payments that your app is processing on behalf of other Mollie merchants.
     *
     * If you create payments on your own account that you want to split between yourself and one or more connected merchants, you can use this `routing` parameter to route the payment accordingly.
     *
     * The `routing` parameter should contain an array of objects, with each object describing the destination for a specific portion of the payment.
     *
     * It is not necessary to indicate in the array which portion goes to yourself. After all portions of the total payment amount have been routed, the amount left will be routed to the current organization automatically.
     *
     * If instead you use OAuth to create payments on a connected merchant's account, refer to the applicationFee parameter.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=routing
     */
    routing?: Array<{
      /**
       * The portion of the total payment amount being routed. Currently only `EUR` payments can be routed.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=routing/amount
       */
      amount: Amount & { currency: 'EUR' };
      /**
       * The destination of this portion of the payment.
       *
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=routing/destination
       */
      destination: OrganisationDestination;
      /**
       * Optionally, schedule this portion of the payment to be transferred to its destination on a later date. The date must be given in `YYYY-MM-DD` format.
       *
       * If no date is given, the funds become available to the connected merchant as soon as the payment succeeds.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=routing/releaseDate
       */
      releaseDate?: string;
    }>;
  } & IdempotencyParameter;

export interface GetParameters {
  include?: PaymentInclude;
  embed?: PaymentEmbed[] | PaymentEmbed;
  testmode?: boolean;
}

export type PageParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type UpdateParameters = Pick<PaymentData, 'redirectUrl' | 'cancelUrl' | 'webhookUrl'> &
  PickOptional<PaymentData, 'description' | 'metadata'> & {
    /**
     * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT rates you have used for the order to ensure your customer's country matches the
     * VAT country.
     *
     * Use this parameter to restrict the payment methods available to your customer to those from a single country.
     *
     * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
     *
     * The field expects a country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example <span class="title-ref">NL</span>.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/update-payment?path=restrictPaymentMethodsToCountry#parameters
     */
    restrictPaymentMethodsToCountry?: string;
  };

export interface CancelParameters extends IdempotencyParameter {
  testmode?: boolean;
}

type OrganisationDestination = {
  /**
   * The type of destination. Currently only the destination type `organization` is supported.
   */
  type: DestinationType.organization;
  /**
   * Required for destination type `organization`. The ID of the connected organization the funds should be routed to.
   */
  organizationId: string;
};
