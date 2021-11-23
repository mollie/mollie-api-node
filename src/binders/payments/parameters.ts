import { Address, Amount, PaymentMethod } from '../../data/global';
import { Issuer } from '../../data/Issuer';
import { PaymentData, PaymentEmbed, PaymentInclude } from '../../data/payments/data';
import { PaginationParameters } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<PaymentData, 'amount' | 'description' | 'redirectUrl' | 'webhookUrl' | 'customerId' | 'mandateId'> &
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
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=restrictPaymentMethodsToCountry#parameters
     */
    restrictPaymentMethodsToCountry?: string;
    billingEmail?: string;
    /**
     * The date the payment should expire, in `YYYY-MM-DD` format. **Please note:** the minimum date is tomorrow and the maximum date is 100 days after tomorrow.
     *
     * After you created the payment, you can still update the `dueDate` via /reference/v2/payments-api/update-payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=dueDate#bank-transfer
     */
    dueDate?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
    digitalGoods?: boolean;
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
     * An iDEAL issuer ID, for example `ideal_INGBNL2A`. This is useful when you want to embed the issuer selection on your own checkout screen. When supplying an issuer ID, the returned payment URL
     * will deep-link to the specific banking website (ING Bank, in this example). The full list of issuers can be retrieved via the Methods API by using the optional `issuers` include.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=issuer#ideal
     */
    issuer?: Issuer;
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

    include?: PaymentInclude[] | PaymentInclude;

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
  };

export interface GetParameters {
  include?: PaymentInclude;
  embed?: PaymentEmbed[] | PaymentEmbed;
  testmode?: boolean;
}

export type ListParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type UpdateParameters = Pick<PaymentData, 'redirectUrl' | 'webhookUrl'> &
  PickOptional<PaymentData, 'description' | 'metadata'> & {
    /**
     * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT rates you have used for the order to ensure your customer's country matches the
     * VAT country.
     *
     * Use this parameter to restrict the payment methods available to your customer to those from a single country.
     *
     * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/update-payment?path=restrictPaymentMethodsToCountry#parameters
     */
    restrictPaymentMethodsToCountry?: string;
  };

export interface CancelParameters {
  testmode?: boolean;
}
