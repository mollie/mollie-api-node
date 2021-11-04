import { Amount, Links, Url } from '../global';
import Model from '../Model';
import { OrderLineData } from '../orders/orderlines/OrderLine';
import { PaymentData } from '../payments/data';

export interface RefundData extends Model<'refund'> {
  /**
   * The amount refunded to your customer with this refund.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=amount#response
   */
  amount: Amount;
  /**
   * The identifier referring to the settlement this payment was settled with. For example, `stl_BkEjN2eBb`. This field is omitted if the refund is not settled (yet).
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=settlementId#response
   */
  settlementId?: string;
  /**
   * This optional field will contain the amount that will be deducted from your account balance, converted to the currency your account is settled in. It follows the same syntax as the `amount`
   * property.
   *
   * Note that for refunds, the `value` key of `settlementAmount` will be negative.
   *
   * Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal refunds.
   *
   * Queued refunds in non EUR currencies will not have a settlement amount until they become `pending`.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=settlementAmount#response
   */
  settlementAmount?: Amount;
  /**
   * The description of the refund that may be shown to your customer, depending on the payment method used.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=description#response
   */
  description: string;
  /**
   * The optional metadata you provided upon refund creation. Metadata can for example be used to link an bookkeeping ID to a refund.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=metadata#response
   */
  metadata?: any;
  /**
   * Since refunds may not be instant for certain payment methods, the refund carries a status field.
   *
   * For a full overview, see refund-statuses.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=status#response
   */
  status: RefundStatus;
  /**
   * An array of order line objects as described in Get order.
   *
   * The lines will show the `quantity`, `discountAmount`, `vatAmount` and `totalAmount` refunded. If the line was partially refunded, these values will be different from the values in response from
   * the Get order API.
   *
   * Only available if the refund was created via the Create Order Refund API.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=lines#response
   */
  lines?: OrderLineData[];
  /**
   * The unique identifier of the payment this refund was created for. For example: `tr_7UhSN1zuXS`. The full payment object can be retrieved via the `payment` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=paymentId#response
   */
  paymentId: string;
  /**
   * The unique identifier of the order this refund was created for. For example: `ord_8wmqcHMN4U`. Not present if the refund was not created for an order.
   *
   * The full order object can be retrieved via the `order` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=orderId#response
   */
  orderId?: string;
  /**
   * The date and time the refund was issued, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=createdAt#response
   */
  createdAt: string;
  /**
   * An object with several URL objects relevant to the refund. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=_links#response
   */
  _links: PaymentRefundLinks;
  _embedded?: {
    payment?: Omit<PaymentData, '_embedded'>;
  };
}

export enum RefundStatus {
  queued = 'queued',
  pending = 'pending',
  processing = 'processing',
  refunded = 'refunded',
  failed = 'failed',
}

export enum RefundEmbed {
  payment = 'payment',
}

export interface PaymentRefundLinks extends Links {
  /**
   * The API resource URL of the payment the refund belongs to.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=_links/payment#response
   */
  payment: Url;
  /**
   * The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=_links/settlement#response
   */
  settlement?: Url;
  /**
   * The API resource URL of the order the refund belongs to. Not present if the refund does not belong to an order.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund?path=_links/order#response
   */
  order?: Url;
}
