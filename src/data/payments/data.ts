import { Address, Amount, ApiMode, CardAudience, CardFailureReason, CardLabel, FeeRegion, HistoricPaymentMethod, Links, Locale, PaymentMethod, SequenceType, Url } from '../global';
import { RefundData } from '../refunds/data';
import { ChargebackData } from '../chargebacks/Chargeback';
import Model from '../Model';
import Nullable from '../../types/Nullable';

export interface PaymentData extends Model<'payment'> {
  /**
   * The mode used to create this payment. Mode determines whether a payment is *real* (live mode) or a *test* payment.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=mode#response
   */
  mode: ApiMode;
  /**
   * The payment's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=createdAt#response
   */
  createdAt: string;
  /**
   * The payment's status. Please refer to the documentation regarding statuses for more info about which statuses occur at what point.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=status#response
   */
  status: PaymentStatus;
  /**
   * Whether or not the payment can be canceled. This parameter is omitted if the payment reaches a final state.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=isCancelable#response
   */
  isCancelable: boolean;
  /**
   * The date and time the payment became authorized, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment is not authorized (yet).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=authorizedAt#response
   */
  authorizedAt?: string;
  /**
   * The date and time the payment became paid, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment is not completed (yet).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=paidAt#response
   */
  paidAt?: string;
  /**
   * The date and time the payment was canceled, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment is not canceled (yet).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=canceledAt#response
   */
  canceledAt?: string;
  /**
   * The date and time the payment will expire, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment can no longer expire.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=expiresAt#response
   */
  expiresAt?: string; // TODO: check if this should become a required field, even as an embedded object
  /**
   * The date and time the payment was expired, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment did not expire (yet).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=expiredAt#response
   */
  expiredAt?: string;
  /**
   * The date and time the payment failed, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This parameter is omitted if the payment did not fail (yet).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=failedAt#response
   */
  failedAt?: string;
  /**
   * The amount of the payment, e.g. `{"currency":"EUR", "value":"100.00"}` for a €100.00 payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=amount#response
   */
  amount: Amount;
  /**
   * The total amount that is already refunded. Only available when refunds are available for this payment. For some payment methods, this amount may be higher than the payment amount, for example to
   * allow reimbursement of the costs for a return shipment to the customer.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=amountRefunded#response
   */
  amountRefunded?: Amount;
  /**
   * The remaining amount that can be refunded. Only available when refunds are available for this payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=amountRemaining#response
   */
  amountRemaining?: Amount;
  /**
   * The total amount that is already captured for this payment. Only available when this payment supports captures.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=amountCaptured#response
   */
  amountCaptured?: Amount;
  /**
   * A short description of the payment. The description is visible in the Dashboard and will be shown on the customer's bank or card statement when possible.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=description#response
   */
  description: string;
  /**
   * The URL your customer will be redirected to after completing or canceling the payment process.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=redirectUrl#response
   */
  redirectUrl?: string;
  /**
   * The URL Mollie will call as soon an important status change takes place.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=webhookUrl#response
   */
  webhookUrl?: string;
  /**
   * The payment method used for this payment, either forced on creation by specifying the `method` parameter, or chosen by the customer on our payment method selection screen.
   *
   * If the payment is only partially paid with a gift card, the method remains `giftcard`.
   *
   * Possible values: `null` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `inghomepay` `kbc` `klarnapaylater` `klarnasliceit` `mybank` `paypal`
   * `paysafecard` `przelewy24` `sofort`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=method#response
   */
  method?: PaymentMethod | HistoricPaymentMethod;
  /**
   * The optional metadata you provided upon payment creation. Metadata can for example be used to link an order to a payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=metadata#response
   */
  metadata: any;
  /**
   * The customer's locale, either forced on creation by specifying the `locale` parameter, or detected by us during checkout. Will be a full locale, for example `nl_NL`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=locale#response
   */
  locale: Locale;
  /**
   * This optional field contains your customer's [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code, detected by us during checkout. For example: `BE`. This field is
   * omitted if the country code was not detected.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=countryCode#response
   */
  countryCode?: string;
  /**
   * The identifier referring to the profile this payment was created on. For example, `pfl_QkEhN94Ba`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=profileId#response
   */
  profileId: string;
  /**
   * This optional field will contain the amount that will be settled to your account, converted to the currency your account is settled in. It follows the same syntax as the `amount` property.
   *
   * Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal or gift cards. If no amount is settled by Mollie the `settlementAmount` is omitted from the response.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=settlementAmount#response
   */
  settlementAmount?: Amount;
  /**
   * The identifier referring to the settlement this payment was settled with. For example, `stl_BkEjN2eBb`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=settlementId#response
   */
  settlementId?: string;
  /**
   * If a customer was specified upon payment creation, the customer's token will be available here as well. For example, `cst_XPn78q9CfT`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=customerId#response
   */
  customerId?: string;
  /**
   * Indicates which type of payment this is in a recurring sequence. Set to `first` for first payments that allow the customer to agree to automatic recurring charges taking place on their account in
   * the future. Set to `recurring` for payments where the customer's card is charged automatically.
   *
   * Set to `oneoff` by default, which indicates the payment is a regular non-recurring payment.
   *
   * Possible values: `oneoff` `first` `recurring`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=sequenceType#response
   */
  sequenceType: SequenceType;
  /**
   * If the payment is a first or recurring payment, this field will hold the ID of the mandate.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=mandateId#response
   */
  mandateId?: string;
  /**
   * When implementing the Subscriptions API, any recurring charges resulting from the subscription will hold the ID of the subscription that triggered the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=subscriptionId#response
   */
  subscriptionId?: string;
  /**
   * If the payment was created for an order, the ID of that order will be part of the response.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=orderId#response
   */
  orderId?: string;
  /**
   * The application fee, if the payment was created with one.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=applicationFee#response
   */
  applicationFee?: {
    amount: Amount;
    description: string;
  };
  /**
   * An object with several URL objects relevant to the payment. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links#response
   */
  _links: PaymentLinks;
  /**
   * An object with payment details.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details#ideal
   */
  details?: Details; // TODO: check if this should become a required field, even as an embedded object
  _embedded?: {
    refunds?: Omit<RefundData, '_embedded'>[];
    chargebacks?: Omit<ChargebackData, '_embedded'>[];
  };
}

interface PaymentLinks {
  self: Url;
  documentation?: Url; // TODO: check if this should become a required field, even as an embedded object
  checkout?: Url;
  changePaymentState?: Url;
  refunds?: Url;
  chargebacks?: Url;
  captures?: Url;
  settlement?: Url;
  mandate?: Url;
  subscription?: Url;
  customer?: Url;
  order?: Url;
}

export type Details =
  | BancontactDetails
  | BankTransferDetails
  | BelfiusPayButtonDetails
  | BitcoinDetails
  | CreditCardDetails
  | GiftCardDetails
  | IdealDetails
  | IngHomePayDetails
  | KbcCbcPaymentButtonDetails
  | KlarnaDetails
  | PayPalDetails
  | PaysafecardDetails
  | SepaDirectDebitDetails
  | SofortBankingDetails;

export interface BancontactDetails {
  cardNumber: string;
  cardFingerprint: string;
  qrCode: QrCode;
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface BankTransferLinks extends Links {
  status: Url;
  payOnline: Url;
}

export interface BankTransferDetails {
  bankName: string;
  bankAccount: string;
  bankBic: string;
  transferReference: string;
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
  billingEmail: string;
  _links: BankTransferLinks;
}

export interface BelfiusPayButtonDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface BitcoinDetails {
  bitcoinAddress: string;
  bitcoinAmount: string;
  bitcoinUri: string;
  qrCode: QrCode;
}

export interface CreditCardDetails {
  cardHolder: string;
  cardNumber: string;
  cardFingerprint: string;
  cardAudience: Nullable<CardAudience>;
  cardLabel: Nullable<CardLabel>;
  cardCountryCode: string;
  cardSecurity: string;
  feeRegion: FeeRegion;
  failureReason: CardFailureReason;
}

export interface GiftCardDetails {
  voucherNumber: string;
  giftcards: GiftCard[];
  remainderAmount: Amount;
  remainderMethod: Amount;
}

export interface IdealDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface IngHomePayDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface KbcCbcPaymentButtonDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface KlarnaDetails {
  extraMerchantData?: any;
}

export interface PayPalDetails {
  /**
   * Only available if the payment has been completed – The consumer's first and last name.
   */
  consumerName: string;
  /**
   * Only available if the payment has been completed – The consumer's email address.
   */
  consumerAccount: string;
  /**
   * PayPal's reference for the transaction, for instance `'9AL35361CF606152E'`.
   */
  paypalReference: string;
  /**
   * ID for the consumer's PayPal account, for instance `'WDJJHEBZ4X2LY'`.
   */
  paypalPayerId: string;
  /**
   * Indicates if the payment is eligible for PayPal's Seller Protection.
   *
   * This parameter is omitted if we did not received the information from PayPal.
   */
  sellerProtection?: 'Eligible' | 'Ineligible' | 'Partially Eligible - INR Only' | 'Partially Eligible - Unauth Only' | 'PartiallyEligible' | 'None' | 'Active Fraud Control - Unauth Premium Eligible';
  /**
   * The shipping address details.
   */
  shippingAddress: Address;
  /**
   * The amount of fee PayPal will charge for this transaction. This field is omitted if PayPal will not charge a fee
   * for this transaction.
   */
  paypalFee?: Amount;
}

export interface PaysafecardDetails {
  customerReference: string;
}

export interface SepaDirectDebitDetails {
  transferReference: string;
  creditorIdentifier: string;
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
  dueDate: string;
  signatureDate: string;
  bankReasonCode: string;
  bankReason: string;
  endToEndIdentifier: string;
  mandateReference: string;
  batchReference: string;
  fileReference: string;
}

export interface SofortBankingDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface QrCode {
  height: number;
  width: number;
  src: string;
}

export enum PaymentStatus {
  open = 'open',
  canceled = 'canceled',
  pending = 'pending',
  authorized = 'authorized',
  expired = 'expired',
  failed = 'failed',
  paid = 'paid',
}

export type PaymentInclude = 'details.qrCode';

export enum PaymentEmbed {
  refunds = 'refunds',
  chargebacks = 'chargebacks',
}

export interface GiftCard {
  issuer: string;
  amount: Amount;
  voucherNumber: string;
}
