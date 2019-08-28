import { SequenceType, IAmount, Locale, PaymentMethod } from '../../global';

/**
 * Create Customer Payment parameters
 *
 * @param amount - The amount that you want to charge, e.g. `{"currency":"EUR", "value":"100.00"}` if you would want to
 *                 charge €100.00.
 * @param description - The description of the payment you're creating. This will be shown to your customer on their
 *                      card or bank statement when possible. We truncate the description automatically according to
 *                      the limits of the used payment method. The description is also visible in any exports you
 *                      generate.
 *
 *                      We recommend you use a unique identifier so that you can always link the payment to the order
 *                      in your back office. This is particularly useful for bookkeeping.
 * @param webhookUrl - Set the webhook URL, where we will send payment status updates to.
 * @param redirectUrl - If the {@link sequenceType} parameter is set to `recurring`, this parameter can be omitted.
 *                      Since the payment will take place without customer interaction, a redirect is not needed.
 * @param locale - Allows you to preset the language to be used in the hosted payment pages shown to the consumer.
 *                 Setting a locale is highly recommended and will greatly improve your conversion rate. When this
 *                 parameter is omitted, the browser language will be used instead if supported by the payment method.
 * @param method - Normally, a payment method screen is shown. However, when using this parameter, you can choose a
 *                 specific payment method and your customer will skip the selection screen and is sent directly to the
 *                 chosen payment method. The parameter enables you to fully integrate the payment method selection
 *                 into your website.
 *
 *                 You can also specify the methods in an array. By doing so we will still show the payment method
 *                 selection screen but will only show the methods specified in the array. For example, you can use
 *                 this functionality to only show payment methods from a specific country to your customer
 *                 `['bancontact', 'belfius', 'inghomepay']`.
 * @param metadata - Provide any data you like, for example a string or a JSON object. We will save the data alongside
 *                   the payment. Whenever you fetch the payment with our API, we'll also include the metadata. You can
 *                   use up to approximately 1kB.
 * @param sequenceType - Enables recurring payments. If set to `first`, a first payment for the customer is created,
 *                       allowing the customer to agree to automatic recurring charges taking place on their account
 *                       in the future. If set to `recurring`, the customer is charged automatically.
 * @param customerId - The ID of the Customer for whom the payment is being created. This is used for recurring
 *                     payments and single click payments.
 * @param mandateId - When creating recurring payments, the ID of a specific Mandate may be supplied to indicate which
 *                    of the consumer's accounts should be credited.
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
export interface ICreateParams {
  amount: IAmount;
  customerId: string;
  description: string;

  locale?: Locale;
  mandateId?: string;
  metadata?: any;
  method?: PaymentMethod | Array<PaymentMethod>;
  sequenceType?: SequenceType;
  webhookUrl?: string;
  redirectUrl?: string;
}

/**
 * List Customer Payment parameters
 *
 * @param customerId - Corresponding Customer ID
 *
 * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
 */
export interface IListParams {
  customerId: string;
}
