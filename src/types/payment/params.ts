import { PaymentEmbed, PaymentInclude } from '../payment';
import { IAddress, IAmount, Locale, PaymentMethod } from '../global';
import { Issuer } from '../issuer';

/**
 * Create Payment parameters.
 *
 * @param amount - The amount that you want to charge, e.g.
 *                 `{"currency":"EUR", "value":"100.00"}`
 *                 if you would want to charge €100.00.
 *
 * @param description - (Generic) The description of the payment you’re creating.
 *                      This will be shown to your customer on their card
 *                      or bank statement when possible. We truncate the
 *                      description automatically according to the limits
 *                      of the used payment method.
 *                      The description is also visible in any exports
 *                      you generate.
 *                      We recommend you use a unique identifier so
 *                      that you can always link the payment to the order
 *                      in your back office.
 *                      This is particularly useful for bookkeeping.
 *
 *                      (PayPal) If a description in the form
 *                      `Order <order number>` is used, the order number is passed to PayPal as
 *                      the invoice reference. This field is searchable in the PayPal merchant
 *                      dashboard. Alternatively, we will recognize the following keywords:
 *                      - Cart
 *                      - Order
 *                      - Invoice
 *                      - Payment
 *
 *                      (KBC/CBC Payment Button) When KBC/CBC is chosen as
 *                      the payment method, the description will be truncated
 *                      to 13 characters.
 *
 * @param redirectUrl - The URL your customer will be redirected to after the
 *                      payment process.
 *                      Only for payments with the `sequenceType` parameter
 *                      set to `recurring`, you can omit this parameter.
 *                      For all other payments, this parameter is mandatory.
 *
 *                      It could make sense for the `redirectUrl`
 *                      to contain a unique identifier  – like your
 *                      order ID – so you can show the right page referencing
 *                      the order when your customer returns.
 * @param webhookUrl - Set the webhook URL, where we will send payment
 *                     status updates to.
 *
 * @param locale - (Generic) Allows you to preset the language to be used in the hosted
 *                 payment pages shown to the consumer.
 *                 Setting a locale is highly recommended and will greatly
 *                 improve your conversion rate. When this parameter is omitted,
 *                 the browser language will be used instead if supported
 *                 by the payment method.
 *
 *                 (Bank transfer) The locale will determine the target bank account the
 *                 customer has to transfer the money to.
 *                 We have dedicated bank accounts for Belgium, Germany
 *                 and The Netherlands. Having the customer use a
 *                 local bank account greatly increases the conversion
 *                 and speed of payment.
 *
 * @param method - Normally, a payment method screen is shown. However,
 *                 when using this parameter, you can choose a specific payment
 *                 method and your customer will skip the selection screen and
 *                 is sent directly to the chosen payment method.
 *                 The parameter enables you to fully integrate the payment method
 *                 selection into your website.
 *
 *                 You can also specify the methods in an array. By doing so
 *                 we will still show the payment method selection screen but
 *                 will only show the methods specified in the array.
 *                 For example, you can use this functionality to only
 *                 show payment methods from a specific country to your
 *                 customer `['bancontact', 'belfius', 'inghomepay']`.
 *
 * @param metadata - Provide any data you like, for example a string or a JSON
 *                   object. We will save the data alongside the payment.
 *                   Whenever you fetch the payment with our API, we’ll also
 *                   include the metadata. You can use up to approximately 1kB.
 *
 * @param sequenceType - Indicate which type of payment this is in a recurring
 *                       sequence. If set to first, a
 *                       {@link https://docs.mollie.com/payments/recurring#payments-recurring-first-payment first payment}
 *                       is created
 *                       for the customer, allowing the customer to agree to
 *                       automatic recurring charges taking place on their account
 *                       in the future. If set to recurring, the customer’s card
 *                       is charged automatically.
 *
 *                       Defaults to oneoff, which is a regular non-recurring
 *                       payment (see also:
 *                       {@link https://docs.mollie.com/payments/recurring Recurring}).
 *
 * @param customerId - The ID of the Customer for whom the payment is being
 *                     created. This is used for recurring payments and
 *                     single click payments.
 *
 * @param mandateId - When creating recurring payments, the ID of a specific Mandate
 *                    may be supplied to indicate which of the consumer’s accounts
 *                    should be credited.
 *
 * @param billingEmail - (Bank transfer) Consumer’s email address, to automatically
 *                       send the bank transfer details to. Please note: the payment
 *                       instructions will be sent immediately when creating the payment.
 *                       If you don’t specify the locale parameter, the email will be
 *                       sent in English, as we haven’t yet been able
 *                       to detect the consumer’s browser language.
 *
 *                       (Bitcoin) The email address of the customer. This is used when
 *                       handling invalid transactions (wrong amount transferred,
 *                       transfer of expired or canceled payments, et cetera).
 *
 * @param dueDate - (Bank transfer) The date the payment should expire, in YYYY-MM-DD format.
 *                  Please note: the minimum date is tomorrow and the maximum
 *                  date is 100 days after tomorrow.
 *
 * @param billingAddress - (Credit Card) The card holder’s address details. We advise to provide
 *                         these details to improve the credit card fraud protection,
 *                         and thus improve conversion.
 *
 * @param shippingAddress - (PayPal) The shipping address details. We advise to provide these
 *                          details to improve PayPal’s fraud protection, and thus
 *                          improve conversion.
 *
 *                          (Credit Card) The shipping address details. We advise to provide these
 *                          details to improve the credit card fraud protection, and thus
 *                          improve conversion.
 *
 * @param issuer - (iDEAL) An iDEAL issuer ID, for example `ideal_INGBNL2A`.
 *                 The returned payment URL will deep-link into the
 *                 specific banking website (ING Bank, in this example).
 *                 The full list of issuers can be retrieved via the
 *                 {@link https://docs.mollie.com/reference/v2/methods-api/get-method#method-includes Methods API}
 *                 by using the optional `issuers` include.
 *
 *                 (Gift Cards) The gift card brand to use for the payment.
 *                 These issuers can be retrieved by using the `issuers`
 *                 {@link https://docs.mollie.com/reference/v2/methods-api/get-method#method-includes include in the Methods API}.
 *                 If you need a brand not in the list,
 *                 contact our support department.
 *                 We can also support closed-loop cards.
 *
 *                 (KBC/CBC Payment Button) The issuer to use for the KBC/CBC payment.
 *                 The full list of issuers can be retrieved via the
 *                 {@link https://docs.mollie.com/reference/v2/methods-api/get-method#method-includes Methods API}
 *                 by using the optional `issuers`
 *                 include.
 *
 * @param customerReference - Used for consumer identification.
 *                            For example, you could use the consumer’s IP address.
 *
 * @param consumerName - (SEPA Direct Debit) Beneficiary name of the account holder.
 *                       Only available if one-off payments are enabled on your account.
 *                       Will pre-fill the beneficiary name in the checkout screen
 *                       if present.
 *
 * @param consumerAccount - (SEPA Direct Debit) IBAN of the account holder.
 *                          Only available if one-off payments are enabled
 *                          on your account. Will pre-fill the IBAN in the
 *                          checkout screen if present.
 *
 * @param voucherNumber - (Gift Cards) The card number on the gift card.
 *
 * @param voucherPin - (Gift Cards) The PIN code on the gift card. Only required if there
 *                     is a PIN code printed on the gift card.
 *
 * @param include - To create a payment with a QR code embedded in the API response,
 *                  call the API endpoint with an include request
 *                  for details.qrCode in the query string.
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`.
 *                    This field is mandatory.
 *
 * @param testmode - Set this to `true` to make this payment a test payment.
 *
 * @param applicationFee - Adding an application fee allows you to charge the merchant a small sum
 *                         for the payment and transfer this to your own account.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/payments-api/create-payment
 */
export interface ICreateParams {
  amount: IAmount;
  description: string;
  redirectUrl?: string;
  webhookUrl?: string;
  locale?: Locale;
  method?: PaymentMethod;
  metadata?: any;
  sequenceType?: string;
  customerId?: string;
  mandateId?: string;
  billingEmail?: string;
  dueDate?: string;
  billingAddress?: IAddress;
  shippingAddress?: IAddress;
  issuer?: Issuer;
  customerReference?: string;
  consumerName?: string;
  consumerAccount?: string;
  voucherNumber?: string;
  voucherPin?: string;

  include?: Array<PaymentInclude> | PaymentInclude;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
  applicationFee?: {
    amount: IAmount;
    description: string;
  };
}

/**
 * Retrieve Payment parameters.
 *
 * @param include - This endpoint allows you to include additional information.
 * @param embed - This endpoint also allows for embedding additional information.
 *
 * @param testmode - Set this to true to get a payment made in test mode.
 *                   If you omit this parameter, you can only retrieve
 *                   live mode payments.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
 */
export interface IGetParams {
  include?: PaymentInclude;
  embed?: Array<PaymentEmbed> | PaymentEmbed;

  // Access token parameters
  testmode?: boolean;
}

/**
 * List Payments parameters.
 *
 * @param from - Offset the result set to the payment with this ID.
 *               The payment with this ID is included in the result
 *               set as well.
 * @param limit - The number of payments to return (with a maximum of 250).
 * @param profileId - The website profile’s unique identifier,
 *                    for example `pfl_3RkSN1zuPE`.
 *
 * @param testmode - Set this to true to only retrieve payments
 *                   made in test mode.
 *                   By default, only live payments are returned.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
 */
export interface IListParams {
  from?: string;
  limit?: number;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}

/**
 * Cancel Payment parameters.
 *
 * @param testmode - Set this to `true` to cancel a test mode payment.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
 */
export interface ICancelParams {
  // Access token parameters
  testmode?: boolean;
}
