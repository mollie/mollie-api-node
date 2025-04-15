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
     * @see https://docs.mollie.com/reference/extra-payment-parameters#apple-pay
     */
    applePayPaymentToken?: string;
    /**
     * @deprecated use billingAddress.email instead
     */
    billingEmail?: string;
    /**
     * The date the payment should expire, in `YYYY-MM-DD` format. **Note:** the minimum date is tomorrow and the maximum date is 100 days after tomorrow.
     *
     * After you created the payment, you can still update the `dueDate` via [Update payment](https://docs.mollie.com/reference/update-payment).
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#bank-transfer
     */
    dueDate?: string;
    /**
     * When creating credit card payments using Mollie Components, you need to provide the card token you received from the card component in this field. The token represents the customer's card information needed to complete the payment.
     *
     * __Note:__ field only valid for `oneoff` and `first` payments. For recurring payments, the `customerId` alone is enough.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#credit-card
     */
    cardToken?: string;
    /**
     * The unique identifier used for referring to a terminal. This ID is used for assigning the payment to a specific terminal and it can be retrieved via List terminals. For more information about
     * point-of-sale payments, please check our guide point-of-sale payments.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#point-of-sale
     */
    terminalId?: string;
    /**
     * The card token you received from the card component of Mollie Components. The token represents the customer's card information needed to complete the payment.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#gift-card
     */
    voucherNumber?: string;
    /**
     * The PIN on the gift card. You can supply this to prefill the PIN, if the card has any.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#gift-card
     */
    voucherPin?: string;
    /**
     * The customer's date of birth. If not provided via the API, iDeal in3 will ask the customer to provide it during the payment process.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#ideal-in3
     */
    consumerDateOfBirth?: string;
    /**
     * For some industries, additional purchase information can be sent to Klarna to increase the authorization rate. You can submit your extra data in this field if you have agreed upon this with Klarna.
     * This field should be an object containing any of the allowed keys and sub-objects described at the [Klarna Developer Documentation](https://docs.klarna.com/api/extra-merchant-data/).
     *
     * Reach out to your account manager at Mollie to enable this feature with Klarna, and to agree on which fields you can send.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#klarna
     */
    extraMerchantData?: Record<string, unknown>;
    /**
     * Billie is a business-to-business (B2B) payment method. It requires extra information to identify the organization that is completing the payment. It is recommended to include these parameters up front for a seamless flow.
     * Otherwise, Billie will ask the customer to complete the missing fields during checkout.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#billie
     */
    company?: {
      /**
       * The organization's registration number.
       */
      registrationNumber: string;
      /**
       * The organization's VAT number.
       */
      vatNumber: string;
      /**
       * The organization's entity type.
       */
      entityType: string;
    };
    /**
     * The unique ID you have used for the PayPal fraud library. You should include this if you use PayPal for an on-demand payment.
     *
     * Refer to the Recurring payments guide for more information on how to implement the fraud library.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#paypal
     */
    sessionId?: string;
    /**
     * Indicate if you are about to deliver digital goods, such as for example a software license. Setting this parameter can have consequences for your PayPal Seller Protection.
     * Refer to [PayPal's documentation]https://www.paypal.com/us/brc/article/seller-protection) for more information.
     *
     * Default: `false`
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#paypal
     */
    digitalGoods?: boolean;
    /**
     * Used by paysafecard for customer identification across payments. When you generate a customer reference yourself, make sure not to put personal identifiable information or IP addresses in the customer reference directly.
     *
     * If not provided, Mollie will use a hashed version of the customer's IP address.
     *
     * @see https://docs.mollie.com/reference/extra-payment-parameters#paysafecard
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
