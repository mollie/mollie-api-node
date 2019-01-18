import {
  ApiMode,
  CardAudience,
  CardFailureReason,
  CardLabel,
  FeeRegion,
  IAmount,
  ILinks,
  IUrl,
  Locale,
  PaymentMethod,
  SequenceType,
} from '../global';
import { IRefund } from './refund';
import { IChargeback } from '../chargeback';

/**
 * Payment Response Object.
 *
 * @param resource - Indicates the response contains a payment object.
 *                   Will always contain `payment` for this endpoint.
 * @param id - The identifier uniquely referring to this payment.
 *             Mollie assigns this identifier at payment creation time.
 *             For example `tr_7UhSN1zuXS`. Its ID will always be used
 *             by Mollie to refer to a certain payment.
 * @param mode - The mode used to create this payment. Mode determines
 *               whether a payment is real (live mode) or a test payment.
 * @param createdAt - The payment’s date and time of creation, in ISO
 *                    8601 format.
 * @param status - The payment’s status. Please refer to the documentation
 *                 regarding statuses for more info about which statuses
 *                 occur at what point.
 * @param isCancelable - Whether or not the payment can be canceled.
 * @param authorizedAt - The date and time the payment became authorized,
 *                       in ISO 8601 format. This parameter is omitted if
 *                       the payment is not authorized (yet).
 * @param paidAt - The date and time the payment became paid, in ISO 8601
 *                 format. This parameter is omitted if the payment is not
 *                 completed (yet).
 * @param canceledAt - The date and time the payment was canceled, in
 *                     ISO 8601 format. This parameter is omitted if the
 *                     payment is not canceled (yet).
 * @param expiresAt - The date and time the payment will expire, in
 *                    ISO 8601 format.
 * @param expiredAt - The date and time the payment was expired, in
 *                    ISO 8601 format. This parameter is omitted if the
 *                    payment did not expire (yet).
 * @param failedAt - The date and time the payment failed, in ISO 8601 format.
 *                   This parameter is omitted if the payment did not fail (yet).
 * @param amount - The amount of the payment, e.g. `{"currency":"EUR", "value":"100.00"}`
 *                 for a €100.00 payment.
 * @param amountRefunded - The total amount that is already refunded. Only
 *                         available when refunds are available for this payment.
 *                         For some payment methods, this amount may be higher than
 *                         the payment amount, for example to allow reimbursement of
 *                         the costs for a return shipment to the customer.
 * @param amountRemaining - The remaining amount that can be refunded. Only available
 *                          when refunds are available for this payment.
 * @param amountCaptured - The total amount that is already captured for this payment.
 *                         Only available when this payment supports captures.
 * @param description - A short description of the payment. The description is visible
 *                      in the Dashboard and will be shown on the customer’s bank or card
 *                      statement when possible.
 * @param redirectUrl - The URL your customer will be redirected to after completing or
 *                      canceling the payment process. (The URL will be `null` for
 *                      recurring payments.)`
 * @param webhookUrl - The URL Mollie will call as soon an important status change
 *                     takes place.
 * @param method - The payment method used for this payment, either forced on creation
 *                 by specifying the method parameter, or chosen by the customer on our
 *                 payment method selection screen. If the payment is only partially paid
 *                 with a gift card, the method remains `giftcard`.
 * @param metadata - The optional metadata you provided upon payment creation. Metadata
 *                   can for example be used to link an order to a payment.
 * @param locale - The customer’s locale, either forced on creation by specifying the locale
 *                 parameter, or detected by us during checkout. Will be a full locale, for
 *                 example `nl_NL`.
 * @param countryCode - This optional field contains your customer’s ISO 3166-1 alpha-2
 *                      country code, detected by us during checkout. For example: `BE`.
 *                      This field is omitted if the country code was not detected.
 * @param profileId - The identifier referring to the profile this payment was created on.
 *                    For example, `pfl_QkEhN94Ba`.
 * @param settlementAmount - This optional field will contain the amount that will be settled
 *                           to your account, converted to the currency your account is settled
 *                           in. It follows the same syntax as the amount property. Any amounts
 *                           not settled by Mollie will not be reflected in this amount,
 *                           e.g. PayPal or gift cards.
 * @param settlementId - The identifier referring to the settlement this payment was settled with.
 *                       For example, `stl_BkEjN2eBb`.
 * @param customerId - If a customer was specified upon payment creation, the customer’s token
 *                     will be available here as well. For example, `cst_XPn78q9CfT`.
 * @param sequenceType - Indicates which type of payment this is in a recurring sequence. Set to
 *                       first for first payments that allow the customer to agree to automatic
 *                       recurring charges taking place on their account in the future.
 *                       Set to recurring for payments where the customer’s card is charged
 *                       automatically. Set to `oneoff` by default, which indicates the payment
 *                       is a regular non-recurring payment.
 * @param mandateId - If the payment is a first or recurring payment, this field will hold the
 *                    ID of the mandate.
 * @param subscriptionId - When implementing the Subscriptions API, any recurring charges
 *                         resulting from the subscription will hold the ID of the subscription
 *                         that triggered the payment.
 * @param orderId - If the payment was created for an order, the ID of that order will
 *                  be part of the response.
 * @param applicationFee - The application fee, if the payment was created with one.
 * @param _links - An object with several URL objects relevant to the payment. Every URL
 *                 object will contain an `href` and a `type` field.
 *
 */
export interface IPayment {
  resource: string;
  id: string;
  mode: ApiMode;
  createdAt: string;
  status: PaymentStatus;
  isCancelable: boolean;
  authorizedAt?: string;
  paidAt?: string;
  canceledAt?: string;
  expiresAt?: string; // TODO: check if this should become a required field, even as an embedded object
  expiredAt?: string;
  failedAt?: string;
  amount: IAmount;
  amountRefunded?: IAmount;
  amountRemaining?: IAmount;
  amountCaptured?: IAmount;
  description: string;
  redirectUrl: string | null;
  webhookUrl?: string;
  method: PaymentMethod;
  metadata: any;
  locale: Locale;
  countryCode?: string;
  profileId: string;
  settlementAmount?: IAmount;
  settlementId?: string;
  customerId?: string;
  sequenceType: SequenceType;
  mandateId?: string;
  subscriptionId?: string;
  orderId?: string;
  applicationFee?: {
    amount: IAmount;
    description: string;
  };
  _links: IPaymentLinks;
  details?: IDetails; // TODO: check if this should become a required field, even as an embedded object
  _embedded?: {
    refunds?: Array<IRefund>;
    chargebacks?: Array<IChargeback>;
  };
}

/**
 * Payment _links object
 *
 * @param checkout - The URL your customer should visit to make the payment.
 *                   This is where you should redirect the consumer to.
 *                   Recurring payments don’t have a checkout URL.
 * @param changePaymentState - Recurring payments do not have a checkout URL,
 *                             because these payments are executed without any
 *                             user interaction. This link is only included for
 *                             test mode recurring payments, and allows you to
 *                             set the final payment state for such payments.
 * @param refunds - The API resource URL of the refunds that belong to this payment.
 * @param chargebacks - The API resource URL of the chargebacks that belong to
 *                      this payment.
 * @param captures - The API resource URL of the captures that belong to this payment.
 * @param settlement - The API resource URL of the settlement this payment has been
 *                     settled with. Not present if not yet settled.
 * @param documentation - The URL to the payment retrieval endpoint documentation.
 * @param mandate - The API resource URL of the mandate linked to this payment.
 *                  Not present if a one-off payment.
 * @param subscription - The API resource URL of the subscription this payment is
 *                       part of. Not present if not a subscription payment.
 * @param customer - The API resource URL of the customer this payment belongs to.
 *                   Not present if not linked to a customer.
 * @param order - The API resource URL of the order this payment was created for.
 *                Not present if not created for an order.
 *
 * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
 */
interface IPaymentLinks {
  self: IUrl;
  documentation?: IUrl; // TODO: check if this should become a required field, even as an embedded object
  checkout?: IUrl;
  changePaymentState?: IUrl;
  refunds?: IUrl;
  chargebacks?: IUrl;
  captures?: IUrl;
  settlement?: IUrl;
  mandate?: IUrl;
  subscription?: IUrl;
  customer?: IUrl;
  order?: IUrl;
}

export type IDetails =
  | IBancontactDetails
  | IBankTransferDetails
  | IBelfiusPayButtonDetails
  | IBitcoinDetails
  | ICreditCardDetails
  | IGiftCardDetails
  | IIdealDetails
  | IIngHomePayDetails
  | IKbcCbcPaymentButtonDetails
  | IPayPalDetails
  | IPaysafecardDetails
  | ISepaDirectDebitDetails
  | ISofortBankingDetails;

/**
 * Bancontact details
 *
 * @param cardNumber - Only available if the payment is completed - The last four digits of the card number.
 * @param cardFingerprint - Only available if the payment is completed - Unique alphanumeric representation of card,
 *                          usable for identifying returning customers.
 * @param qrCode - Only available if requested during payment creation - The QR code that can be scanned by the mobile
 *                 Bancontact application. This enables the desktop to mobile feature.
 * @param consumerName - Only available if the payment is completed – The consumer’s name.
 * @param consumerAccount - Only available if the payment is completed – The consumer’s bank account. This may be an
 *                          IBAN, or it may be a domestic account number.
 * @param consumerBic - Only available if the payment is completed – The consumer’s bank’s BIC / SWIFT code.
 */
export interface IBancontactDetails {
  cardNumber: string;
  cardFingerprint: string;
  qrCode: IQrCode;
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 * For bank transfer payments, the `_links` object
 * will contain some additional URL objects relevant to the payment.
 *
 * @param status - A link to a hosted payment page where your customer
 *                 can check the status of their payment.
 * @param payOnline - A link to a hosted payment page where your customer
 *                    can finish the payment using an alternative payment
 *                    method also activated on your website profile.
 */
export interface IBankTransferLinks extends ILinks {
  status: IUrl;
  payOnline: IUrl;
}

/**
 * Bank transfer details
 *
 * @param bankName - The name of the bank the consumer should wire the amount to.
 * @param bankAccount - The IBAN the consumer should wire the amount to.
 * @param bankBic - The BIC of the bank the consumer should wire the amount to.
 * @param transferReference - The reference the consumer should use when wiring the amount. Note you should not apply
 *                            any formatting here; show it to the consumer as-is.
 * @param consumerName - Only available if the payment has been completed – The consumer’s name.
 * @param consumerAccount - Only available if the payment has been completed – The consumer’s bank account. This may be
 *                          an IBAN, or it may be a domestic account number.
 * @param consumerBic - Only available if the payment has been completed – The consumer’s bank’s BIC / SWIFT code.
 * @param billingEmail - Only available if filled out in the API or by the consumer – The email address which the
 *                       consumer asked the payment instructions to be sent to.
 * @param _links - See {@link IBankTransferLinks}
 */
export interface IBankTransferDetails {
  bankName: string;
  bankAccount: string;
  bankBic: string;
  transferReference: string;
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
  billingEmail: string;
  _links: IBankTransferLinks;
}

/**
 * Belfius Payment Button details
 *
 * @param consumerName - Only available one banking day after the payment has been completed – The consumer’s name.
 * @param consumerAccount - Only available one banking day after the payment has been completed – The consumer’s IBAN.
 * @param consumerBic - Only available one banking day after the payment has been completed – `GKCCBEBB`.
 */
export interface IBelfiusPayButtonDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 * Bitcoin details
 *
 * @param bitcoinAddress - Only available if the payment has been completed
 *                         – The bitcoin address the bitcoins were
 *                         transferred to.
 * @param bitcoinAmount - The amount transferred in XBT.
 * @param bitcoinUri - A URI that is understood by Bitcoin wallet clients
 *                     and will cause such clients to prepare the transaction.
 *                     Follows the
 *                     {@link https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki BIP 21 URI scheme}.
 * @param qrCode - Only available if requested during payment creation
 *                 - The QR code that can be scanned by Bitcoin wallet
 *                 clients and will cause such clients to prepare the
 *                 transaction.
 */
export interface IBitcoinDetails {
  bitcoinAddress: string;
  bitcoinAmount: string;
  bitcoinUri: string;
  qrCode: IQrCode;
}

/**
 * Credit Card Details
 *
 * @param cardHolder - Only available if the payment has been completed
 *                     - The card holder’s name.
 * @param cardNumber - Only available if the payment has been completed
 *                     - The last four digits of the card number.
 * @param cardFingerprint - Only available if the payment has been completed
 *                          - Unique alphanumeric representation of card,
 *                          usable for identifying returning customers.
 * @param cardAudience - Only available if the payment has been completed
 * and if the data is available
 *                       - The card’s target audience.
 * @param cardLabel - Only available if the payment has been completed
 *                    - The card’s label. Note that not all labels can be
 *                    processed through Mollie.
 * @param cardCountryCode - Only available if the payment has been completed
 *                          - The ISO 3166-1 alpha-2 country code of the country
 *                          the card was issued in. For example: `BE`.
 * @param cardSecurity - Only available if the payment has been completed
 *                       – The type of security used during payment processing.
 * @param feeRegion - Only available if the payment has been completed
 *                    – The fee region for the payment: `intra-eu` for consumer
 *                    cards from the EU, and other for all other cards.
 * @param failureReason - Only available for failed payments. Contains a
 *                        failure reason code.
 */
export interface ICreditCardDetails {
  cardHolder: string;
  cardNumber: string;
  cardFingerprint: string;
  cardAudience: CardAudience;
  cardLabel: CardLabel;
  cardCountryCode: string;
  cardSecurity: string;
  feeRegion: FeeRegion;
  failureReason: CardFailureReason;
}

/**
 * Gift Card Details
 *
 * @param voucherNumber - The voucher number, with the last four digits masked. When multiple gift cards are used, this
 *                        is the first voucher number. Example: `606436353088147****`.
 * @param giftcards - A list of details of all giftcards that are used for this payment. Each object will contain the
 *                    following properties.
 * @param remainderAmount - Only available if another payment method was used to pay the remainder amount – The amount
 *                          that was paid with another payment method for the remainder amount.
 * @param remainderMethod - Only available if another payment method was used to pay the remainder amount – The payment
 *                          method that was used to pay the remainder amount.
 */
export interface IGiftCardDetails {
  voucherNumber: string;
  giftcards: Array<IGiftCard>;
  remainderAmount: IAmount;
  remainderMethod: IAmount;
}

/**
 * iDEAL details
 *
 * @param consumerName - Only available if the payment has been completed
 *                       – The consumer’s name.
 * @param consumerAccount - Only available if the payment has been completed
 *                          – The consumer’s IBAN.
 * @param consumerBic - Only available if the payment has been completed
 *                      – The consumer’s bank’s BIC.
 */
export interface IIdealDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 * ING Home'Pay details
 *
 * @param consumerName - Only available one banking day after the payment has been completed
 *                       – The consumer’s name.
 * @param consumerAccount - Only available one banking day after the payment has been completed
 *                          – The consumer’s IBAN.
 * @param consumerBic - Only available one banking day after the payment has been completed
 *                      – `BBRUBEBB`.
 */
export interface IIngHomePayDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 * KBC/CBC Payment Button details
 *
 * @param consumerName - Only available one banking day after the payment has been completed – The consumer’s name.
 * @param consumerAccount - Only available one banking day after the payment has been completed – The consumer’s IBAN.
 * @param consumerBic - Only available one banking day after the payment has been completed – The consumer’s bank’s BIC.
 */
export interface IKbcCbcPaymentButtonDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 * PayPal details
 *
 * @param consumerName - Only available if the payment has been completed – The consumer’s first and last name.
 * @param consumerAccount - Only available if the payment has been completed – The consumer’s email address.
 * @param paypalReference - PayPal’s reference for the transaction, for instance `9AL35361CF606152E`.
 */
export interface IPayPalDetails {
  consumerName: string;
  consumerAccount: string;
  paypalReference: string;
}

/**
 * paysafecard details
 *
 * @param customerReference - The consumer identification supplied when the payment was created.
 */
export interface IPaysafecardDetails {
  customerReference: string;
}

/**
 * SEPA Direct Debit details
 *
 * @param transferReference - Transfer reference used by Mollie to identify this payment.
 * @param creditorIdentifier - The creditor identifier indicates who is authorized to execute the payment. In this case,
 *                             it is a reference to Mollie.
 * @param consumerName - The consumer’s name.
 * @param consumerAccount - The consumer’s IBAN.
 * @param consumerBic - The consumer’s bank’s BIC.
 * @param dueDate - Estimated date the payment is debited from the consumer’s bank account, in `YYYY-MM-DD` format.
 * @param signatureDate - Only available if the payment has been verified – Date the payment has been signed by the
 *                        consumer, in `YYYY-MM-DD` format.
 * @param bankReasonCode - Only available if the payment has failed – The official reason why this payment has failed.
 *                         A detailed description of each reason is available on the website of the European Payments Council.
 * @param bankReason - Only available if the payment has failed – A textual desciption of the failure reason.
 * @param endToEndIdentifier - Only available for batch transactions – The original end-to-end identifier that you’ve
 *                             specified in your batch.
 * @param mandateReference - Only available for batch transactions – The original mandate reference that you’ve
 *                           specified in your batch.
 * @param batchReference - Only available for batch transactions – The original batch reference that you’ve
 *                         specified in your batch.
 * @param fileReference - Only available for batch transactions – The original file reference that you’ve specified
 *                        in your batch.
 */
export interface ISepaDirectDebitDetails {
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

/**
 * Sofort Banking details
 *
 * @param consumerName - Only available if the payment has been completed – The consumer’s name.
 * @param consumerAccount - Only available if the payment has been completed – The consumer’s IBAN.
 * @param consumerBic - Only available if the payment has been completed – The consumer’s bank’s BIC.
 */
export interface ISofortBankingDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

/**
 *  QR Code
 *
 * @param height - Height of the image in pixels.
 * @param width - Width of the image in pixels.
 * @param src - The URI you can use to display the QR code.
 *              Note that we can send both data URIs as well
 *              as links to HTTPS images. You should support both.
 */
export interface IQrCode {
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

/**
 * Gift Card
 *
 * @param issuer - The ID of the gift card brand that was used during the payment.
 * @param amount - The amount in EUR that was paid with this gift card.
 * @param voucherNumber - The voucher number, with the last four digits masked. Example: `606436353088147****`
 */
export interface IGiftCard {
  issuer: string;
  amount: IAmount;
  voucherNumber: string;
}
