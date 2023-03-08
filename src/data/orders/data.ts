import Nullable from '../../types/Nullable';
import { Address, Amount, ApiMode, Links, Url } from '../global';
import Model from '../Model';
import { PaymentData } from '../payments/data';
import { RefundData } from '../refunds/data';
import { OrderLineData } from './orderlines/OrderLine';
import { ShipmentData } from './shipments/Shipment';

export interface OrderData extends Model<'order'> {
  /**
   * The mode used to create this order.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=mode#response
   */
  mode: ApiMode;
  /**
   * The profile the order was created on, for example `pfl_v9hTwCvYqw`.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=profileId#response
   */
  profileId: string;
  /**
   * The payment method last used when paying for the order.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=method#response
   */
  method: Nullable<string>;
  /**
   * The total amount of the order, including VAT and discounts.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amount#response
   */
  amount: Amount;
  /**
   * The amount captured, thus far. The captured amount will be settled to your account.
   *
   * For orders that have the status `authorized`, you must ship the order to ensure the order amount gets captured.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amountCaptured#response
   */
  amountCaptured?: Nullable<Amount>;
  /**
   * The total amount refunded, thus far.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=amountRefunded#response
   */
  amountRefunded?: Nullable<Amount>;
  /**
   * The status of the order.
   *
   * Possible values: `created` `paid` `authorized` `canceled` `shipping` `completed` `expired`
   *
   * See Order status changes for details on the orders' statuses.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=status#response
   */
  status: OrderStatus;
  /**
   * Whether or not the order can be (partially) canceled.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=isCancelable#response
   */
  isCancelable: boolean;
  /**
   * The person and the address the order is billed to.
   *
   * Refer to the documentation of the address object for more information on which formats are accepted.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=billingAddress#response
   */
  billingAddress: OrderAddress;
  /**
   * The date of birth of your customer, if available.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=consumerDateOfBirth#response
   */
  consumerDateOfBirth?: string;
  /**
   * Your order number that was used when creating the order.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=orderNumber#response
   */
  orderNumber: string;
  /**
   * The person and the address the order is billed to.
   *
   * Refer to the documentation of the address object for more information on which formats are accepted.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=shippingAddress#response
   */
  shippingAddress: OrderAddress;
  /**
   * The locale used during checkout. Note that the locale may have been changed by your customer during checkout.
   *
   * Can be any `xx_XX` format ISO 15897 locale. Example values: `en_US` `nl_NL` `nl_BE` `fr_FR` `fr_BE` `de_DE` `de_AT` `de_CH` `es_ES` `ca_ES` `pt_PT` `it_IT` `nb_NO` `sv_SE` `fi_FI` `da_DK` `is_IS`
   * `hu_HU` `pl_PL` `lv_LV` `lt_LT`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=locale#response
   */
  locale: string;
  /**
   * Data provided during the order creation.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=metadata#response
   */
  metadata?: any;
  /**
   * The URL your customer will be redirected to after completing or canceling the payment process.
   *
   * The URL will be `null` for recurring orders.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=redirectUrl#response
   */
  redirectUrl: Nullable<string>;
  /**
   * An array of order line objects. Each object will have the properties listed below.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=lines#response
   */
  lines: OrderLineData[];
  /**
   * The URL Mollie will call as soon an important status change on the order takes place.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=webhookUrl#response
   */
  webhookUrl?: string;
  /**
   * The order's date and time of creation, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date and time the order will expire, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. This should be the final date for you to fully ship the order.
   *
   * For some payment methods, such as *Klarna Pay later* this means that you will lose the authorization and not be settled for the amounts of the unshipped order lines.
   *
   * The expiry period for orders is 28 days.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=expiresAt#response
   */
  expiresAt?: string;
  /**
   * If the order has been paid, the time of payment will be present in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=paidAt#response
   */
  paidAt?: string;
  /**
   * If the order has been authorized, the time of authorization will be present in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=authorizedAt#response
   */
  authorizedAt?: string;
  /**
   * If the order has been canceled, the time of cancellation will be present in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=canceledAt#response
   */
  canceledAt?: string;
  /**
   * If the order is completed, the time of completion will be present in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=completedAt#response
   */
  completedAt?: string;
  _embedded?: {
    payments?: Omit<PaymentData, '_embedded'>[];
    refunds?: Omit<RefundData, '_embedded'>[];
    shipments?: Omit<ShipmentData, '_embedded'>[];
  };
  /**
   * An object with several URL objects relevant to the order. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links#response
   */
  _links: OrderLinks;
}

export interface OrderLinks extends Links {
  /**
   * The URL your customer should visit to make the payment for the order. This is where you should redirect the customer to after creating the order.
   *
   * As long as order is still in the `created` state, this link can be used by your customer to pay for this order. You can safely share this URL with your customer.
   *
   * The URL can also be retrieved and copied from the Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order?path=_links/checkout#response
   */
  checkout?: Url;
}

export enum OrderStatus {
  created = 'created',
  paid = 'paid',
  authorized = 'authorized',
  canceled = 'canceled',
  shipping = 'shipping',
  completed = 'completed',
  expired = 'expired',
  pending = 'pending',
}

export interface OrderAddress extends Address {
  organizationName?: string;
  title?: string;
  givenName: string;
  familyName: string;
  email: string;
  phone?: string;
}

export enum OrderEmbed {
  payments = 'payments',
  refunds = 'refunds',
  shipments = 'shipments',
}
