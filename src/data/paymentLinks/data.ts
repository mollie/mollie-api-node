import { type SequenceType, type Address, type Amount, type ApiMode, type Links, type PaymentMethod, type Url } from '../global';
import type Model from '../Model';
import { type PaymentLine } from '../payments/data';

export interface PaymentLinkData extends Model<'payment-link'> {
  /**
   * The mode used to create this payment link. Mode determines whether a payment link is *real* (live mode) or a *test* payment link.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=mode#response
   */
  mode: ApiMode;
  /**
   * A short description of the payment link. The description is visible in the Dashboard and will be shown on the customer's bank or card statement when possible. This description will eventual been
   * used as payment description.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=description#response
   */
  description: string;
  /**
   * The amount of the payment link, e.g. `{"currency":"EUR", "value":"100.00"}` for a €100.00 payment link.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=amount#response
   */
  amount?: Amount;
  /**
   * The minimum amount of the payment link. This property is only allowed when there is no amount provided. The customer will be prompted to enter a value greater than or equal to the minimum amount.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=minimumAmount#response
   */
  minimumAmount?: Amount;
  /**
   * Whether the payment link is archived. Customers will not be able to complete payments on archived payment links.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=archived#response
   */
  archived: boolean;
  /**
   * The URL your customer will be redirected to after completing the payment process.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=redirectUrl#response
   */
  redirectUrl?: string;
  /**
   * The webhook URL where we will send payment status updates to.
   *
   * The webhookUrl is optional, but without a webhook you will miss out on important status changes to any payments resulting from the payment link.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=webhookUrl#response
   */
  webhookUrl?: string;
  /**
   * Optionally provide the order lines for the payment. Each line contains details such as a description of the item ordered and its price.
   *
   * All lines must have the same currency as the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=lines#response
   */
  lines?: PaymentLine[];
  /**
   * The customer's billing address details. We advise to provide these details to improve fraud protection and conversion.
   *
   * Should include `email` or a valid postal address consisting of `streetAndNumber`, `postalCode`, `city` and `country`.
   *
   * Required for payment methods `in3`, `klarna`, `billie` and `riverty`.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=billingAddress#response
   */
  billingAddress?: Address;
  /**
   * The customer's shipping address details. We advise to provide these details to improve fraud protection and conversion.
   *
   * Should include `email` or a valid postal address consisting of `streetAndNumber`, `postalCode`, `city` and `country`.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=shippingAddress#response
   */
  shippingAddress?: Address;
  /**
   * The identifier referring to the profile this payment link was created on. For example, `pfl_QkEhN94Ba`.
   *
   * Most API credentials are linked to a single profile. In these cases the profileId can be omitted in the creation request. For organization-level credentials such as OAuth access tokens however, the profileId parameter is required.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=profileId#response
   */
  profileId: string;
  /**
   * Indicates whether the payment link is reusable. If this field is set to true, customers can make multiple payments using the same link.
   *
   * If no value is specified, the field defaults to false, allowing only a single payment per link.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=reusable#response
   */
  reusable?: boolean;
  /**
   * The payment link's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date and time the payment link became paid, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=paidAt#response
   */
  paidAt?: string;
  /**
   * @deprecated This field currently always returns null and will be removed from the API in the future.
   */
  // TODO: Remove in v5.0.0
  updatedAt?: null;
  /**
   * The expiry date and time of the payment link, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=expiresAt#response
   */
  expiresAt?: string;
  /**
   * Indicates which type of payment this is in a recurring sequence. If set to `first`, a payment mandate is established right after a payment is made by the customer.
   *
   * Set to `oneoff` by default, which is a regular payment link and will not establish a mandate after payment.
   *
   * Possible values: `oneoff` `first`
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=sequenceType#response
   */
  sequenceType: SequenceType;
  /**
   * The ID of the customer the payment link is being created for. Only relevant when `sequenceType` is set to `first`.
   *
   * If a value is not provided, the customer will be required to input relevant information which will be used to establish a mandate after the payment is made.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=customerId#response
   */
  customerId?: string;
  /**
   * An array of payment methods that are allowed to be used for this payment link. When this parameter is not provided or is an empty array, all enabled payment methods will be available.
   *
   * Possible values: `applepay` `bacs` `bancomatpay` `bancontact` `banktransfer` `belfius` `billie` `blik` `creditcard` `eps` `giftcard` `ideal` `in3` `kbc` `klarna` `mbway` `multibanco` `mybank` `paybybank` `paypal` `paysafecard` `pointofsale` `przelewy24` `riverty` `satispay` `swish` `trustly` `twint` `voucher`
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=allowedMethods#response
   */
  allowedMethods?: PaymentMethod[];
  /**
   * With Mollie Connect you can charge fees on payment links that your app is processing on behalf of other Mollie merchants.
   *
   * If you use OAuth to create payment links on a connected merchant's account, you can charge a fee using this applicationFee parameter.
   *
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link?path=applicationFee#response
   */
  applicationFee?: {
    /**
     * The fee that you wish to charge.
     */
    amount: Amount;
    /**
     * The description of the application fee. This will appear on settlement reports towards both you and the connected merchant.
     */
    description: string;
  };
  _links: Links & { paymentLink: Url };
}
