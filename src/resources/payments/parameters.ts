import { Address, Amount, PaymentMethod } from '../../data/global';
import { CommonListParameters } from '../../types/parameters';
import { Issuer } from '../../data/Issuer';
import { PaymentData, PaymentEmbed, PaymentInclude } from '../../data/payments/data';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<PaymentData, 'amount' | 'description' | 'redirectUrl' | 'webhookUrl' | 'customerId' | 'mandateId'> &
  PickOptional<PaymentData, 'locale' | 'metadata' | 'sequenceType'> & {
    /**
     * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment method and your customer will skip the selection screen and is sent directly to
     * the chosen payment method. The parameter enables you to fully integrate the payment method selection into your website.
     *
     * You can also specify the methods in an array. By doing so we will still show the payment method selection screen but will only show the methods specified in the array. For example, you can use
     * this functionality to only show payment methods from a specific country to your customer `['bancontact', 'belfius', 'inghomepay']`.
     *
     * Possible values: `applepay` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `inghomepay` `kbc` `mybank` `paypal` `paysafecard` `przelewy24`
     * `sofort`
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
     * After you created the payment, you can still update the `dueDate` via the /reference/v2/payments-api/update-payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=dueDate#bank-transfer
     */
    dueDate?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
    digitalGoods?: boolean;
    /**
     * An iDEAL issuer ID, for example `ideal_INGBNL2A`. The returned payment URL will deep-link into the specific banking website (ING Bank, in this example). The full list of issuers can be
     * retrieved via the Methods API by using the optional `issuers` include.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=issuer#ideal
     */
    issuer?: Issuer;
    /**
     * Used for consumer identification. Use the following guidelines to create your `customerReference`:
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
     * Beneficiary name of the account holder. Only available if one-off payments are enabled on your account. Will pre-fill the beneficiary name in the checkout screen if present.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=consumerName#sepa-direct-debit
     */
    consumerName?: string;
    /**
     * IBAN of the account holder. Only available if one-off payments are enabled on your account. Will pre-fill the IBAN in the checkout screen if present.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=consumerAccount#sepa-direct-debit
     */
    consumerAccount?: string;
    /**
     * The card number on the gift card.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=voucherNumber#gift-cards
     */
    voucherNumber?: string;
    /**
     * The PIN code on the gift card. Only required if there is a PIN code printed on the gift card.
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
     * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee#access-token-parameters
     */
    applicationFee?: {
      /**
       * The amount in that the app wants to charge, e.g. `{"currency":"EUR", "value":"10.00"}` if the app would want to charge €10.00.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee/amount#access-token-parameters
       */
      amount: Amount;
      /**
       * The description of the application fee. This will appear on settlement reports to the merchant and to you.
       *
       * The maximum length is 255 characters.
       *
       * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=applicationFee/description#access-token-parameters
       */
      description: string;
    };
  };

export interface GetParameters {
  include?: PaymentInclude;
  embed?: PaymentEmbed[] | PaymentEmbed;
  testmode?: boolean;
}

export type ListParameters = CommonListParameters & {
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
