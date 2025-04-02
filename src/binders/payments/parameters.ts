import { type Amount, type PaymentMethod } from '../../data/global';
import { type PaymentData, type PaymentEmbed, type PaymentInclude } from '../../data/payments/data';
import type MaybeArray from '../../types/MaybeArray';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<
  PaymentData,
  | 'amount'
  | 'description'
  | 'redirectUrl'
  | 'cancelUrl'
  | 'webhookUrl'
  | 'customerId'
  | 'mandateId'
  | 'lines'
  | 'shippingAddress'
  | 'billingAddress'
  | 'routing'
  | 'issuer'
  | 'restrictPaymentMethodsToCountry'
> &
  PickOptional<PaymentData, 'locale' | 'metadata' | 'sequenceType' | 'captureMode' | 'captureDelay'> & {
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
    method?: MaybeArray<PaymentMethod>;
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
    /**
     * @deprecated use billingAddress.email instead
     */
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
     * The card token you got from Mollie Components. The token contains the card information (such as card holder, card number, and expiry date) needed to complete the payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=cardToken#credit-card
     */
    cardToken?: string;
    /**
     * The unique identifier used for referring to a terminal. This ID is used for assigning the payment to a specific terminal and it can be retrieved via List terminals. For more information about
     * point-of-sale payments, please check our guide point-of-sale payments.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=terminalId#point-of-sale
     */
    terminalId?: string;
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
    /**
     * This endpoint allows you to include additional information via the `include` query string parameter.
     * * `details.qrCode`: Include a QR code object. Only available for iDEAL, Bancontact and bank transfer payments.
     *
     * __Note:__ In the REST API, this is not part of the request body, but a query Parameter. It is included here for consistency.
     */
    include?: MaybeArray<PaymentInclude.qrCode>; // currently only one valid value, but making 'MaybeArray' for consistency
    profileId?: string;
    testmode?: boolean;
    /**
     * Adding an application fee allows you to charge the merchant a small sum for the payment and transfer this to your own account.
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
  } & IdempotencyParameter;

export interface GetParameters {
  include?: MaybeArray<PaymentInclude>;
  embed?: MaybeArray<PaymentEmbed>;
  testmode?: boolean;
}

export type PageParameters = PaginationParameters & {
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

export interface ReleaseParameters {
  testmode?: boolean;
}
