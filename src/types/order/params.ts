import { IAmount, Locale, PaymentMethod } from '../global';
import { IPayment } from '../payment';
import { IOrderAddress, OrderEmbed } from './index';
import { ICreateOrderLine } from './line';

/**
 * Create Order parameters.
 *
 * @param amount - The total amount of the order, including VAT and discounts.
 *                 This is the amount that will be charged to your customer.
 * @param orderNumber - The order number. For example, 16738.
 *                      We recommend that each order should have a unique
 *                      order number.
 * @param lines - The lines in the order. Each line contains details such
 *                as a description of the item ordered, its price et cetera.
 *                See Order line details for the exact details on the lines.
 * @param billingAddress - The billing person and address for the order.
 *                         See Order address details for the exact fields needed.
 * @param shippingAddress - The shipping address for the order.
 *                          See Order address details for the exact fields needed.
 *                          If omitted, it is assumed to be identical to
 *                          the billingAddress.
 * @param consumerDateOfBirth - The date of birth of your customer. Some payment methods
 *                              need this value and if you have it, you should send it so
 *                              that your customer does not have to enter it again later
 *                              in the checkout process.
 * @param redirectUrl - The URL your customer will be redirected to after
 *                      the payment process.
 * @param webhookUrl - Set the webhook URL, where we will send order status changes to.
 * @param locale - Allows you to preset the language to be used in the hosted payment
 *                 pages shown to the consumer.
 * @param method - Normally, a payment method screen is shown. However, when using this
 *                 parameter, you can choose a specific payment method and your customer
 *                 will skip the selection screen and is sent directly to the chosen
 *                 payment method. The parameter enables you to fully integrate the payment
 *                 method selection into your website. You can also specify the methods in
 *                 an array. By doing so we will still show the payment method selection
 *                 screen but will only show the methods specified in the array. For example,
 *                 you can use this functionality to only show payment methods from a
 *                 specific country to your customer.
 * @param payment - Any payment specific properties can be passed here. See Payment specific
 *                  parameters for the possible fields.
 * @param metadata - Provide any data you like, for example a string or a JSON object.
 *                   We will save the data alongside the order. Whenever you fetch the order with
 *                   our API, we’ll also include the metadata. You can use up to approximately 1kB.
 *
 * @param profileId - The payment profile’s unique identifier, for example `pfl_3RkSN1zuPE`.
 *                    This field is mandatory.
 * @param testmode - Set this to true to make this order a test order.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/create-order
 */
export interface ICreateParams {
  amount: IAmount;
  orderNumber: string;
  lines: Array<ICreateOrderLine>;
  billingAddress: IOrderAddress;
  shippingAddress?: IOrderAddress;
  consumerDateOfBirth?: string;
  redirectUrl?: string;
  webhookUrl?: string;
  locale: Locale;
  method: PaymentMethod;
  payment?: Partial<IPayment>;
  metadata?: any;
  embed?: Array<OrderEmbed>;

  // Access token parameters
  profileId?: string;
  testmode?: boolean;
}

/**
 * Get Order parameters.
 *
 * @param testmode - Set this to true to retrieve a test mode order.
 *
 * @param embed - This endpoint also allows for embedding additional information by appending the following values via
 *                the `embed` query string parameter.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/get-order
 */
export interface IGetParams {
  // Access token parameters
  testmode?: boolean;

  embed?: Array<OrderEmbed>;
}

/**
 * List Orders parameters.
 *
 * @param from - Offset the result set to the order with this ID. The order with this ID is included in the result set
 *               as well.
 * @param limit - The number of orders to return (with a maximum of 250).
 *
 * @param profileId - The website profile’s unique identifier, for example `pfl_3RkSN1zuPE`.
 * @param testmode - Set this to `true` to list test mode orders.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
 */
export interface IListParams {
  from?: string;
  limit?: number;

  // Accesss token parameters
  profileId?: string;
  testmode?: boolean;
}

/**
 * Update Order parameters.
 *
 * @param billingAddress - The billing person and address for the order.
 *                         See {@link https://docs.mollie.com/reference/v2/orders-api/create-order#order-address-details Order address details} for the exact fields needed.
 * @param shippingAddress - The shipping address for the order.
 *                          See {@link https://docs.mollie.com/reference/v2/orders-api/create-order#order-address-details Order address details}
 *                          for the exact fields needed.
 *
 * @since 2.2.0
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/update-order
 */
export interface IUpdateParams {
  billingAddress?: IOrderAddress;
  shippingAddress?: IOrderAddress;

  // Access token parameters
  testmode?: boolean;
}

/**
 * Cancel Order parameters
 *
 * @param testmode - Set this to `true` to cancel a test mode order.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
 */
export interface ICancelParams {
  // Access token parameters
  testmode?: boolean;
}
