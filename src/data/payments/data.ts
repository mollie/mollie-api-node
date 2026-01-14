import type Nullable from '../../types/Nullable';
import { type ChargebackData } from '../chargebacks/Chargeback';
import {
  type Address,
  type Amount,
  type ApiMode,
  type CardAudience,
  type CardFailureReason,
  type CardLabel,
  type FeeRegion,
  type HistoricPaymentMethod,
  type Links,
  type Locale,
  type PaymentMethod,
  type SequenceType,
  type Url,
} from '../global';
import type Model from '../Model';
import { type RefundData } from '../refunds/data';
import { type CaptureData } from './captures/data';

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
   * The payment's status. Refer to the documentation regarding statuses for more info about which statuses occur at what point.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=status#response
   */
  status: PaymentStatus;
  /**
   * This object offers details about the status of a payment. Currently it is only available for point-of-sale payments.
   *
   * You can find more information about the possible values of this object on [this page](https://docs.mollie.com/reference/status-reasons).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=statusReason#response
   */
  statusReason?: {
    /**
     * A machine-readable code that indicates the reason for the payment's status.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=statusReason/code#response
     */
    code: string;
    /**
     * A description of the status reason, localized according to the payment `locale`.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=statusReason/message#response
     */
    message: string;
  };
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
   * The total amount that was charged back for this payment. Only available when the total charged back amount is not zero.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=amountChargedBack#response
   */
  amountChargedBack?: Amount;
  /**
   * A short description of the payment. The description is visible in the Dashboard and will be shown on the customer's bank or card statement when possible.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=description#response
   */
  description: string;
  /**
   * The URL your customer will be redirected to after completing or canceling the payment process.
   *
   * The URL will be `null` for recurring payments.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=redirectUrl#response
   */
  redirectUrl?: string;
  /**
   * The optional redirect URL you provided during payment creation. Consumer that explicitly cancel the payment will be redirected to this URL if provided, or otherwise to the `redirectUrl` instead —
   * see above.
   *
   * Mollie will always give you status updates via webhooks, including for the `canceled` status. This parameter is therefore entirely optional, but can be useful when implementing a dedicated
   * consumer-facing flow to handle payment cancellations.
   *
   * The URL will be `null` for recurring payments.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=cancelUrl#response
   */
  cancelUrl?: string;
  /**
   * The URL Mollie will call as soon an important status change takes place.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=webhookUrl#response
   */
  webhookUrl?: string;
  /**
   * Optionally provide the order lines for the payment. Each line contains details such as a description of the item ordered and its price.
   *
   * All lines must have the same currency as the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines#response
   */
  lines?: PaymentLine[];
  /**
   * The customer's billing address details. We advise to provide these details to improve fraud protection and conversion.
   *
   * This is particularly relevant for card payments.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=billingAddress#response
   */
  billingAddress?: Address;
  /**
   * The customer's shipping address details. We advise to provide these details to improve fraud protection and conversion.
   *
   * This is particularly relevant for card payments.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=shippingAddress#response
   */
  shippingAddress?: Address;
  /**
   * The payment method used for this payment, either forced on creation by specifying the `method` parameter, or chosen by the customer on our payment method selection screen.
   *
   * If the payment is only partially paid with a gift card, the method remains `giftcard`.
   *
   * Possible values: `null` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `in3` `kbc` `klarnapaylater` `klarnapaynow` `klarnasliceit` `mybank`
   * `paypal` `paysafecard` `przelewy24` `sofort`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=method#response
   */
  method?: PaymentMethod | HistoricPaymentMethod;
  /**
   * **Only relevant for iDEAL, KBC/CBC, gift card, and voucher payments.**
   *
   * **⚠️ With the introduction of iDEAL 2 in 2025, this field will be ignored for iDEAL payments. For more information on the migration, refer to our [help center](https://help.mollie.com/hc/de/articles/19100313768338-iDEAL-2-0).**
   *
   * Some payment methods are a network of connected banks or card issuers. In these cases, after selecting the payment method, the customer may still need to select the appropriate issuer before the payment can proceed.
   *
   * We provide hosted issuer selection screens, but these screens can be skipped by providing the `issuer` via the API up front.
   *
   * The full list of issuers for a specific method can be retrieved via the Methods API by using the optional `issuers` include.
   *
   * A valid issuer for iDEAL is for example `ideal_INGBNL2A` (for ING Bank).
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=issuer#response
   */
  issuer?: string;
  /**
   * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT rates you have used for the order to ensure your customer's country matches the VAT country.
   *
   * Use this parameter to restrict the payment methods available to your customer to those from a single country.
   *
   * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
   *
   * The field expects a country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example `NL`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=restrictPaymentMethodsToCountry#response
   */
  restrictPaymentMethodsToCountry?: string;
  /**
   * The optional metadata you provided upon payment creation. Metadata can for example be used to link an order to a payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=metadata#response
   */
  metadata: unknown;
  /**
   * **Only relevant if you wish to manage authorization and capturing separately.**
   *
   * By default, the customer's card or bank account is immediately charged when they complete the payment.
   *
   * Some payment methods also allow placing a hold on the card or bank account. This hold or 'authorization' can then at a later point either be 'captured' or canceled.
   *
   * To enable this way of working, set the capture mode to `manual` and capture the payment manually using the `paymentCaptures.create` API.
   */
  captureMode?: CaptureMethod;
  /**
   * **Only relevant if you wish to manage authorization and capturing separately.**
   *
   * Some payment methods allow placing a hold on the card or bank account. This hold or 'authorization' can then at a later point either be 'captured' or canceled.
   *
   * By default, we charge the customer's card or bank account immediately when they complete the payment. If you set a capture delay however, we will delay the automatic capturing of the payment for the specified amount of time. For example `8 hours` or `2 days`.
   *
   * To schedule an automatic capture, the `captureMode` must be set to `automatic`.
   *
   * The maximum delay is 7 days (168 hours).
   *
   * Possible values: `... hours`, `... days`
   */
  captureDelay?: string;
  /**
   * **Only relevant if you wish to manage authorization and capturing separately.**
   *
   * Indicates the date before which the payment needs to be captured, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. From this date onwards we can no longer guarantee a successful capture. The parameter is omitted if the payment is not authorized (yet).
   */
  captureBefore?: string;
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
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=customerId#response-parameters-for-recurring-payments
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
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=sequenceType#response-parameters-for-recurring-payments
   */
  sequenceType: SequenceType;
  /**
   * If the payment is a first or recurring payment, this field will hold the ID of the mandate.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=mandateId#response-parameters-for-recurring-payments
   */
  mandateId?: string;
  /**
   * When implementing the Subscriptions API, any recurring charges resulting from the subscription will hold the ID of the subscription that triggered the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=subscriptionId#response-parameters-for-recurring-payments
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
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=applicationFee#mollie-connect-response-parameters
   */
  applicationFee?: {
    amount: Amount;
    description: string;
  };
  /**
   * _This functionality is not enabled by default. Reach out to our partner management team if you wish to use it._
   *
   * With Mollie Connect you can charge fees on payments that your app is processing on behalf of other Mollie merchants.
   *
   * If you create payments on your own account that you want to split between yourself and one or more connected merchants, you can use this `routing` parameter to route the payment accordingly.
   *
   * The routing parameter should contain an array of objects, with each object describing the destination for a specific portion of the payment.
   *
   * It is not necessary to indicate in the array which portion goes to yourself. After all portions of the total payment amount have been routed, the amount left will be routed to the current organization automatically.
   *
   * If instead you use OAuth to create payments on a connected merchant's account, refer to the `applicationFee` parameter.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/create-payment?path=routing#parameters
   */
  routing?: PaymentRoutingInfo[];
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
  details?:
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
    | PointOfSaleDetails
    | SepaDirectDebitDetails
    | SofortBankingDetails
    | VoucherDetails;
  _embedded?: {
    refunds?: Omit<RefundData, '_embedded'>[];
    chargebacks?: Omit<ChargebackData, '_embedded'>[];
    captures?: Omit<CaptureData, '_embedded'>[];
  };
}

interface PaymentLinks extends Links {
  /**
   * The URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/checkout#response
   */
  checkout?: Url;
  /**
   * Recurring payments do not have a checkout URL, because these payments are executed without any user interaction. This link is included for test mode recurring payments, and allows you to set the
   * final payment state for such payments.
   *
   * This link is also included for paid test mode payments. This allows you to create a refund or chargeback for the payment. This works for all payment types that can be charged back and/or
   * refunded.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/changePaymentState#response-parameters-for-recurring-payments
   */
  changePaymentState?: Url;
  /**
   * The API resource URL of the refunds that belong to this payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/refunds#response
   */
  refunds?: Url;
  /**
   * The API resource URL of the chargebacks that belong to this payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/chargebacks#response
   */
  chargebacks?: Url;
  /**
   * The API resource URL of the captures that belong to this payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/captures#response
   */
  captures?: Url;
  /**
   * The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/settlement#response
   */
  settlement?: Url;
  /**
   * The API resource URL of the mandate linked to this payment. Not present if a one-off payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/mandate#response-parameters-for-recurring-payments
   */
  mandate?: Url;
  /**
   * The API resource URL of the subscription this payment is part of. Not present if not a subscription payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/subscription#response-parameters-for-recurring-payments
   */
  subscription?: Url;
  /**
   * The API resource URL of the customer this payment belongs to. Not present if not linked to a customer.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/customer#response-parameters-for-recurring-payments
   */
  customer?: Url;
  /**
   * The API resource URL of the order this payment was created for. Not present if not created for an order.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/order#response
   */
  order?: Url;
  /**
   * Direct link to the payment in the Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/dashboard#response
   */
  dashboard: Url;
}

export interface BancontactDetails {
  /**
   * Only available if the payment is completed - The last four digits of the card number.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardNumber#bancontact
   */
  cardNumber: string;
  /**
   * Only available if the payment is completed - Unique alphanumeric representation of card, usable for identifying returning customers.
   *
   * @deprecated Use `consumerAccount` instead.
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardFingerprint#bancontact
   */
  cardFingerprint: string;
  /**
   * Only available if requested during payment creation - The QR code that can be scanned by the mobile Bancontact application. This enables the desktop to mobile feature.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/qrCode#bancontact
   */
  qrCode: QrCode;
  /**
   * Only available if the payment is completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#bancontact
   */
  consumerName: string;
  /**
   * Only available if the payment is completed – The consumer's bank account. This may be an IBAN, or it may be a domestic account number.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#bancontact
   */
  consumerAccount: string;
  /**
   * Only available if the payment is completed – The consumer's bank's BIC / SWIFT code.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#bancontact
   */
  consumerBic: string;
  /**
   * The reason why the payment did not succeed. Only available when there's a reason known.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/failureReason#bancontact
   */
  failureReason: string;
}

export interface BankTransferLinks extends Links {
  /**
   * A link to a hosted payment page where your customer can check the status of their payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/status#bank-transfer
   */
  status: Url;
  /**
   * A link to a hosted payment page where your customer can finish the payment using an alternative payment method also activated on your website profile.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/payOnline#bank-transfer
   */
  payOnline: Url;
}

export interface BankTransferDetails {
  /**
   * The name of the bank the consumer should wire the amount to.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/bankName#bank-transfer
   */
  bankName: string;
  /**
   * The IBAN the consumer should wire the amount to.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/bankAccount#bank-transfer
   */
  bankAccount: string;
  /**
   * The BIC of the bank the consumer should wire the amount to.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/bankBic#bank-transfer
   */
  bankBic: string;
  /**
   * The reference the consumer should use when wiring the amount. Note you should not apply any formatting here; show it to the consumer as-is.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/transferReference#bank-transfer
   */
  transferReference: string;
  /**
   * Only available if the payment has been completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#bank-transfer
   */
  consumerName: string;
  /**
   * Only available if the payment has been completed – The consumer's bank account. This may be an IBAN, or it may be a domestic account number.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#bank-transfer
   */
  consumerAccount: string;
  /**
   * Only available if the payment has been completed – The consumer's bank's BIC / SWIFT code.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#bank-transfer
   */
  consumerBic: string;
  /**
   * Only available if filled out in the API or by the consumer – The email address which the consumer asked the payment instructions to be sent to.
   *
   * @deprecated use billingAddress.email instead
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/billingEmail#bank-transfer
   */
  billingEmail: string;
}

export interface BelfiusPayButtonDetails {
  /**
   * Only available one banking day after the payment has been completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#belfius-pay-button
   */
  consumerName: string;
  /**
   * Only available one banking day after the payment has been completed – The consumer's IBAN.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#belfius-pay-button
   */
  consumerAccount: string;
  /**
   * Only available one banking day after the payment has been completed – `GKCCBEBB`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#belfius-pay-button
   */
  consumerBic: string;
}

export interface BitcoinDetails {
  bitcoinAddress: string;
  bitcoinAmount: string;
  bitcoinUri: string;
  qrCode: QrCode;
}

export interface CreditCardDetails {
  /**
   * Only available if the payment has been completed - The card holder's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardHolder#Credit%20card%20v2
   */
  cardHolder: string;
  /**
   * Only available if the payment has been completed - The last four digits of the card number.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardNumber#Credit%20card%20v2
   */
  cardNumber: string;
  /**
   * Only available if the payment has been completed - Unique alphanumeric representation of card, usable for identifying returning customers.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardFingerprint#Credit%20card%20v2
   */
  cardFingerprint: string;
  /**
   * Only available if the payment has been completed and if the data is available - The card's target audience.
   *
   * Possible values: `consumer` `business` `null`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardAudience#Credit%20card%20v2
   */
  cardAudience: Nullable<CardAudience>;
  /**
   * Only available if the payment has been completed - The card's label. Note that not all labels can be processed through Mollie.
   *
   * Possible values: `American Express` `Carta Si` `Carte Bleue` `Dankort` `Diners Club` `Discover` `JCB` `Laser` `Maestro` `Mastercard` `Unionpay` `Visa` `null`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardLabel#Credit%20card%20v2
   */
  cardLabel: Nullable<CardLabel>;
  /**
   * Only available if the payment has been completed - The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country the card was issued in. For example:
   * `BE`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardCountryCode#Credit%20card%20v2
   */
  cardCountryCode: string;
  /**
   * Only available if the payment has been completed – The type of security used during payment processing.
   *
   * Possible values: `normal` `3dsecure`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/cardSecurity#Credit%20card%20v2
   */
  cardSecurity: 'normal' | '3dsecure';
  /**
   * Only available if the payment has been completed – The fee region for the payment. The `intra-eu` value is for consumer cards from the EEA.
   *
   * Possible values: `american-express` `amex-intra-eea` `carte-bancaire` `intra-eu` `intra-eu-corporate` `domestic` `maestro` `other`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/feeRegion#Credit%20card%20v2
   */
  feeRegion: FeeRegion;
  /**
   * Only available for failed payments. Contains a failure reason code.
   *
   * Possible values: `authentication_abandoned` `authentication_failed` `authentication_required` `authentication_unavailable_acs` `card_declined` `card_expired` `inactive_card` `insufficient_funds`
   * `invalid_cvv` `invalid_card_holder_name` `invalid_card_number` `invalid_card_type` `possible_fraud` `refused_by_issuer` `unknown_reason`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/failureReason#Credit%20card%20v2
   */
  failureReason: CardFailureReason;
  /**
   * A localized message that can be shown to your customer, depending on the `failureReason`.
   *
   * Example value: `Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte.`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/failureMessage#Credit%20card%20v2
   */
  failureMessage: string;
  /**
   * The wallet used when creating the payment.
   *
   * Possible values: `applepay`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/wallet#Credit%20card%20v2
   */
  wallet?: 'applepay';
}

export interface GiftCardDetails {
  /**
   * The voucher number, with the last four digits masked. When multiple gift cards are used, this is the first voucher number. Example: `606436353088147****`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/voucherNumber#gift-cards
   */
  voucherNumber: string;
  /**
   * A list of details of all giftcards that are used for this payment. Each object will contain the following properties.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/giftcards#gift-cards
   */
  giftcards: GiftCard[];
  /**
   * Only available if another payment method was used to pay the remainder amount – The amount that was paid with another payment method for the remainder amount.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/remainderAmount#gift-cards
   */
  remainderAmount: Amount;
  /**
   * Only available if another payment method was used to pay the remainder amount – The payment method that was used to pay the remainder amount.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/remainderMethod#gift-cards
   */
  remainderMethod: Amount;
}

export interface IdealDetails {
  /**
   * Only available if the payment has been completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#ideal
   */
  consumerName: string;
  /**
   * Only available if the payment has been completed – The consumer's IBAN.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#ideal
   */
  consumerAccount: string;
  /**
   * Only available if the payment has been completed – The consumer's bank's BIC.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#ideal
   */
  consumerBic: string;
}

export interface IngHomePayDetails {
  consumerName: string;
  consumerAccount: string;
  consumerBic: string;
}

export interface KbcCbcPaymentButtonDetails {
  /**
   * Only available one banking day after the payment has been completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#kbccbc-payment-button
   */
  consumerName: string;
  /**
   * Only available one banking day after the payment has been completed – The consumer's IBAN.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#kbccbc-payment-button
   */
  consumerAccount: string;
  /**
   * Only available one banking day after the payment has been completed – The consumer's bank's BIC.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#kbccbc-payment-button
   */
  consumerBic: string;
}

export interface KlarnaDetails {
  extraMerchantData?: any;
}

export interface PayPalDetails {
  /**
   * Only available if the payment has been completed – The consumer's first and last name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#paypal
   */
  consumerName: string;
  /**
   * Only available if the payment has been completed – The consumer's email address.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#paypal
   */
  consumerAccount: string;
  /**
   * PayPal's reference for the transaction, for instance `9AL35361CF606152E`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/paypalReference#paypal
   */
  paypalReference: string;
  /**
   * ID for the consumer's PayPal account, for instance `WDJJHEBZ4X2LY`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/paypalPayerId#paypal
   */
  paypalPayerId: string;
  /**
   * Indicates if the payment is eligible for PayPal's Seller Protection.
   *
   * Possible values: `Eligible` `Ineligible` `Partially Eligible - INR Only` `Partially Eligible - Unauth Only` `PartiallyEligible` `None` `Active Fraud Control - Unauth Premium Eligible`
   *
   * This parameter is omitted if we did not received the information from PayPal.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/sellerProtection#paypal
   */
  sellerProtection?: 'Eligible' | 'Ineligible' | 'Partially Eligible - INR Only' | 'Partially Eligible - Unauth Only' | 'PartiallyEligible' | 'None' | 'Active Fraud Control - Unauth Premium Eligible';
  /**
   * The shipping address details.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/shippingAddress#paypal
   */
  shippingAddress?: Address;
  /**
   * The amount of fee PayPal will charge for this transaction. This field is omitted if PayPal will not charge a fee for this transaction.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/paypalFee#paypal
   */
  paypalFee?: Amount;
}

export interface PaysafecardDetails {
  /**
   * The consumer identification supplied when the payment was created.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/customerReference#paysafecard
   */
  customerReference: string;
}

export interface PointOfSaleDetails {
  /**
   * The identifier referring to the terminal this payment was created for. For example, `term_utGtYu756h`.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailsterminalid-string
   */
  terminalId: string;
  /**
   * Only available if the payment has been completed - The last four digits of the card number.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardnumber-string--null-2
   */
  cardNumber?: string;
  /**
   * Only available if the payment has been completed - The first 6 digits & last 4 digits of the customer's masked card number.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailsmaskednumber-string--null
   */
  maskedNumber?: string;
  /**
   * Only available if the payment has been completed - A unique identifier assigned to a cardholder's payment account, linking multiple transactions from wallets and physical card to a single account, also across payment methods or when the card is reissued.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardfingerprint-string--null-1
   */
  cardFingerprint?: string;
  /**
   * Only available if the payment has been completed and if the data is available - The card's target audience.
   *
   * Possible values: `consumer` `business` `null`
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardaudience-string--null-1
   */
  cardAudience?: Nullable<'consumer' | 'business'>;
  /**
   * Only available if the payment has been completed - The card's label. Note that not all labels can be processed through Mollie.
   *
   * Possible values: `American Express` `Carta Si` `Carte Bleue` `Dankort` `Diners Club` `Discover` `JCB` `Laser` `Maestro` `Mastercard` `Unionpay` `Visa` `null`
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardlabel-string--null-1
   */
  cardLabel?: Nullable<'Visa' | 'Mastercard' | 'Vpay' | 'Maestro'>;
  /**
   * Only available if the payment has been completed - The card funding type, if known.
   *
   * Possible values: `credit` `debit` `null`
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardfunding-string--null-1
   */
  cardFunding?: Nullable<'credit' | 'debit'>;
  /**
   * Only available if the payment has been completed - The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country the card was issued in. For example:
   * `BE`.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailscardcountrycode-string--null-1
   */
  cardCountryCode?: string;
  /**
   * Only available if the payment has been completed - The applicable card fee region. For example, intra_eea applies to consumer cards from the European Economic Area (EEA).
   *
   * Possible values: `domestic` `inter` `intra_eea` `null`
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailsfeeregion-string--null-1
   */
  feeRegion?: Nullable<'domestic' | 'inter' | 'intra_eea'>;
  /**
   * Only available if the payment has been completed - The Point of sale receipt object.
   *
   * @see https://docs.mollie.com/reference/extra-payment-parameters#detailsreceipt-object--%EF%B8%8F-beta-feature-reach-out-to-support
   */
  receipt?: Nullable<PointOfSaleReceipt>;
}

export interface SepaDirectDebitDetails {
  /**
   * Transfer reference used by Mollie to identify this payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/transferReference#sepa-direct-debit
   */
  transferReference: string;
  /**
   * The creditor identifier indicates who is authorized to execute the payment. In this case, it is a reference to Mollie.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/creditorIdentifier#sepa-direct-debit
   */
  creditorIdentifier: string;
  /**
   * The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#sepa-direct-debit
   */
  consumerName: string;
  /**
   * The consumer's IBAN.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#sepa-direct-debit
   */
  consumerAccount: string;
  /**
   * The consumer's bank's BIC.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#sepa-direct-debit
   */
  consumerBic: string;
  /**
   * Estimated date the payment is debited from the consumer's bank account, in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/dueDate#sepa-direct-debit
   */
  dueDate: string;
  /**
   * Only available if the payment has been verified – Date the payment has been signed by the consumer, in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/signatureDate#sepa-direct-debit
   */
  signatureDate: string;
  /**
   * Only available if the payment has failed – The official reason why this payment has failed. A detailed description of each reason is available on the website of the European Payments Council.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/bankReasonCode#sepa-direct-debit
   */
  bankReasonCode: string;
  /**
   * Only available if the payment has failed – A textual description of the failure reason.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/bankReason#sepa-direct-debit
   */
  bankReason: string;
  /**
   * Only available for batch transactions – The original end-to-end identifier that you've specified in your batch.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/endToEndIdentifier#sepa-direct-debit
   */
  endToEndIdentifier: string;
  /**
   * Only available for batch transactions – The original mandate reference that you've specified in your batch.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/mandateReference#sepa-direct-debit
   */
  mandateReference: string;
  /**
   * Only available for batch transactions – The original batch reference that you've specified in your batch.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/batchReference#sepa-direct-debit
   */
  batchReference: string;
  /**
   * Only available for batch transactions – The original file reference that you've specified in your batch.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/fileReference#sepa-direct-debit
   */
  fileReference: string;
}

export interface SofortBankingDetails {
  /**
   * Only available if the payment has been completed – The consumer's name.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerName#sofort-banking
   */
  consumerName: string;
  /**
   * Only available if the payment has been completed – The consumer's IBAN.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerAccount#sofort-banking
   */
  consumerAccount: string;
  /**
   * Only available if the payment has been completed – The consumer's bank's BIC.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/consumerBic#sofort-banking
   */
  consumerBic: string;
}

export interface VoucherDetails {
  /**
   * The ID of the voucher brand that was used during the payment. When multiple vouchers are used, this is the issuer of the first voucher.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/issuer#vouchers
   */
  issuer: string;
  /**
   * A list of details of all vouchers that are used for this payment. Each object will contain the following properties.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/vouchers#vouchers
   */
  vouchers: {
    /**
     * The ID of the voucher brand that was used during the payment.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/vouchers/issuer#vouchers
     */
    issuer: string;
    /**
     * The amount that was paid with this voucher.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/vouchers/amount#vouchers
     */
    amount: Amount;
  }[];
  /**
   * Only available if another payment method was used to pay the remainder amount – The amount that was paid with another payment method for the remainder amount.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/remainderAmount#vouchers
   */
  remainderAmount: Amount;
  /**
   * Only available if another payment method was used to pay the remainder amount – The payment method that was used to pay the remainder amount.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/remainderMethod#vouchers
   */
  remainderMethod: string;
}

export interface QrCode {
  height: number;
  width: number;
  src: string;
}

export interface PointOfSaleReceipt {
  /**
   * A unique code provided by the cardholder’s bank to confirm that the transaction was successfully approved.
   */
  authorizationCode?: string;
  /**
   * The unique number that identifies a specific payment application on a chip card.
   */
  applicationIdentifier?: string;
  /**
   * The method by which the card was read by the terminal.
   *
   * Possible values: `chip` `magnetic-stripe` `near-field-communication` `contactless` `moto` `null`
   */
  cardReadMethod?: 'chip' | 'magnetic-stripe' | 'near-field-communication' | 'contactless' | 'moto';
  /**
   * The method used to verify the cardholder's identity.
   *
   * Possible values: `no-cvm-required` `online-pin` `offline-pin` `consumer-device` `signature` `signature-and-online-pin` `online-pin-and-signature` `none` `failed` `null`
   */
  cardVerificationMethod?: 'no-cvm-required' | 'online-pin' | 'offline-pin' | 'consumer-device' | 'signature' | 'signature-and-online-pin' | 'online-pin-and-signature' | 'none' | 'failed';
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

export enum PaymentInclude {
  qrCode = 'details.qrCode',
  remainderDetails = 'details.remainderDetails',
}

export enum PaymentEmbed {
  refunds = 'refunds',
  chargebacks = 'chargebacks',
  captures = 'captures',
}

export enum CaptureMethod {
  automatic = 'automatic',
  manual = 'manual',
}

export interface GiftCard {
  /**
   * The ID of the gift card brand that was used during the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/giftcards/issuer#gift-cards
   */
  issuer: string;
  /**
   * The amount in EUR that was paid with this gift card.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/giftcards/amount#gift-cards
   */
  amount: Amount;
  /**
   * The voucher number, with the last four digits masked. Example: `606436353088147****`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/giftcards/voucherNumber#gift-cards
   */
  voucherNumber: string;
}

export interface PaymentLine {
  /**
   * The type of product purchased. For example, a physical or a digital product.
   *
   * The tip payment line type is not available when creating a payment.
   *
   * Possible values: `physical` `digital` `shipping_fee` `discount` `store_credit` `gift_card` `surcharge` `tip` (default: `physical`)
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/type#lines
   */
  type?: PaymentLineType;
  /**
   * A description of the line item. For example _LEGO 4440 Forest Police Station_.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/description#lines
   */
  description: string;
  /**
   * The number of items.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/quantity#lines
   */
  quantity: number;
  /**
   * The unit for the quantity. For example _pcs_, _kg_, or _cm_.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/quantityUnit#lines
   */
  quantityUnit?: string;
  /**
   *
   * The price of a single item including VAT.
   *
   * For example: `{"currency":"EUR", "value":"89.00"}` if the box of LEGO costs €89.00 each.
   *
   * For types `discount`, `store_credit`, and `gift_card`, the unit price must be negative.
   *
   * The unit price can be zero in case of free items.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/unitPrice#lines
   */
  unitPrice: Amount;
  /**
   * Any line-specific discounts, as a positive amount. Not relevant if the line itself is already a discount type.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/discountAmount#lines
   */
  discountAmount?: Amount;
  /**
   * The details of subsequent recurring billing cycles.
   *
   * These parameters are used in the Mollie Checkout to inform the shopper of the details for recurring products in the payments.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/recurring#lines
   */
  recurring?: RecurringInfo;
  /**
   * The total amount of the line, including VAT and discounts.
   *
   * Should match the following formula: `(unitPrice × quantity) - discountAmount`.
   *
   * The sum of all `totalAmount` values of all order lines should be equal to the full payment amount.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/totalAmount#lines
   */
  totalAmount: Amount;
  /**
   * The VAT rate applied to the line, for example `21.00` for 21%.
   *
   * The vatRate should be passed as a string and not as a float, to ensure the correct number of decimals are passed.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/vatRate#lines
   */
  vatRate?: string;
  /**
   * The amount of value-added tax on the line. The `totalAmount` field includes VAT, so the `vatAmount` can be calculated with the formula `totalAmount × (vatRate / (100 + vatRate))`.
   *
   * Any deviations from this will result in an error.
   *
   * For example, for a `totalAmount` of SEK 100.00 with a 25.00% VAT rate, we expect a VAT amount of `SEK 100.00 × (25 / 125) = SEK 20.00`.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/vatAmount#lines
   */
  vatAmount?: Amount;
  /**
   * The SKU, EAN, ISBN or UPC of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/sku#lines
   */
  sku?: string;
  /**
   * An array with the voucher categories, in case of a line eligible for a voucher. See the Integrating Vouchers guide for more information.
   *
   * Possible values: `meal` `eco` `gift` `sport_culture`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/categories#lines
   */
  categories?: PaymentLineCategory[];
  /**
   * A link pointing to an image of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/_links/imageUrl#lines
   */
  imageUrl?: string;
  /**
   * A link pointing to the product page in your web shop of the product sold.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=lines/_links/productUrl#lines
   */
  productUrl?: string;
}

export interface RecurringInfo {
  /**
   * A description of the recurring item. If not present, the main description of the item will be used.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/recurring/description#recurring
   */
  description?: string;
  /**
   * TCadence unit of the recurring item. For example: `12 months`, `52 weeks` or `365 days`.
   *
   * Possible values: `... months` `... weeks` `... days`
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/recurring/interval#recurring
   */
  interval: string;
  /**
   * Total amount and currency of the recurring item.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/recurring/amount#recurring
   */
  amount?: Amount;
  /**
   * Total number of charges for the subscription to complete. Leave empty for ongoing subscription.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/recurring/times#recurring
   */
  times?: number;
  /**
   * The start date of the subscription if it does not start right away (format `YYYY-MM-DD`)
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=details/recurring/startDate#recurring
   */
  startDate?: string;
}

export enum PaymentLineType {
  physical = 'physical',
  digital = 'digital',
  shipping_fee = 'shipping_fee',
  discount = 'discount',
  store_credit = 'store_credit',
  gift_card = 'gift_card',
  surcharge = 'surcharge',
  tip = 'tip',
}

export enum PaymentLineCategory {
  meal = 'meal',
  eco = 'eco',
  gift = 'gift',
  sport_culture = 'sport_culture',
}

export interface PaymentRoutingInfo {
  /**
   * The portion of the total payment amount being routed. Currently only EUR payments can be routed.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=routing/rule#response
   */
  amount: Amount;
  /**
   * The destination of this portion of the payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=routing/rule#response
   */
  destination: {
    /**
     * The type of destination. Currently only the destination type `organization` is supported.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=routing/rule#response
     */
    type: RoutingType;
    /**
     * Required for destination type `organization`. The ID of the connected organization the funds should be routed to.
     *
     * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=routing/rule#response
     */
    organizationId: string;
  };
  /**
   * Optionally, schedule this portion of the payment to be transferred to its destination on a later date. The date must be given in `YYYY-MM-DD` format.
   *
   * If no date is given, the funds become available to the connected merchant as soon as the payment succeeds.
   */
  releaseDate?: string;
}

export enum RoutingType {
  organization = 'organization',
}
