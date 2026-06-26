import { type Amount, type ApiMode, type Links, type Url } from '../global';
import type Model from '../Model';
import { type OrderLineData } from '../orders/orderlines/OrderLine';
import { type PaymentData } from '../payments/data';

export interface RefundData extends Model<'refund'> {
  /**
   * Whether this entity was created in live mode or in test mode.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=mode#response
   */
  mode: ApiMode;
  /**
   * The amount refunded to your customer with this refund. The amount is allowed to be lower than the original payment amount.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=amount#response
   */
  amount: Amount;
  /**
   * The identifier referring to the settlement this payment was settled with. For example, `stl_BkEjN2eBb`. This field is omitted if the refund is not settled (yet).
   *
   * @see https://docs.mollie.com/reference/get-refund?path=settlementId#response
   */
  settlementId?: string;
  /**
   * This optional field will contain the amount that will be deducted from your account balance, converted to the currency your account is settled in. It follows the same syntax as the `amount`
   * property.
   *
   * For refunds, the `value` key of `settlementAmount` will be negative.
   *
   * Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal refunds.
   *
   * Queued refunds in non-EUR currencies will not have a settlement amount until they become `pending`.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=settlementAmount#response
   */
  settlementAmount?: Amount;
  /**
   * The description of the refund that may be shown to your customer, depending on the payment method used.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=description#response
   */
  description: string;
  /**
   * The optional metadata you provided upon refund creation. Metadata can for example be used to link an bookkeeping ID to a refund.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=metadata#response
   */
  metadata: unknown;
  /**
   * Since refunds may not be instant for certain payment methods, the refund carries a status field.
   *
   * For a full overview, see refund-statuses.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=status#response
   */
  status: RefundStatus;
  /**
   * An array of order line objects as described in Get order.
   *
   * The lines will show the `quantity`, `discountAmount`, `vatAmount` and `totalAmount` refunded. If the line was partially refunded, these values will be different from the values in response from
   * the *Get order* endpoint.
   *
   * Only available if the refund was created via the Create order refund endpoint.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=lines#response
   */
  lines?: OrderLineData[];
  /**
   * The unique identifier of the payment this refund was created for. For example: `tr_7UhSN1zuXS`. The full payment object can be retrieved via the `payment` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=paymentId#response
   */
  paymentId: string;
  /**
   * The unique identifier of the order this refund was created for. For example: `ord_8wmqcHMN4U`. Not present if the refund was not created for an order.
   *
   * The full order object can be retrieved via the `order` URL in the `_links` object.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=orderId#response
   */
  orderId?: string;
  /**
   * The date and time the refund was issued, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=createdAt#response
   */
  createdAt: string;
  /**
   * A reference to the refund as registered by the payment provider. Contains the reference `type` (for example `acquirer-reference`) and the unique `id` provided by the payment provider.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=externalReference#response
   */
  externalReference?: {
    /**
     * Specifies the reference type.
     */
    type?: string;
    /**
     * Unique reference from the payment provider.
     */
    id?: string;
  };
  /**
   * *This feature is only available to marketplace operators.*
   *
   * When creating refunds for *routed* payments, by default the full amount is deducted from your balance.
   *
   * If you want to pull back funds from the connected merchant(s), you can use this parameter to specify what amount needs to be reversed from which merchant(s).
   *
   * If you simply want to fully reverse the routed funds, you can also use the `reverseRouting` parameter instead.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=routingReversals#response
   */
  routingReversals?: RefundRoutingReversal[];
  /**
   * An object with several URL objects relevant to the refund. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=_links#response
   */
  _links: PaymentRefundLinks;
  /**
   * An object with related resources that have been embedded in the response. Only present if a related resource was requested via the `embed` query parameter.
   */
  _embedded?: {
    payment?: Omit<PaymentData, '_embedded'>;
  };
}

export enum RefundStatus {
  /**
   * The refund is queued due to a lack of balance. See the insufficient balance section below. A queued refund can be canceled.
   */
  queued = 'queued',
  /**
   * The refund is ready to be picked up for processing. You can still cancel the refund if you like.
   */
  pending = 'pending',
  /**
   * The refund was canceled and will no longer be processed.
   */
  canceled = 'canceled',
  /**
   * The refund is being processed. Cancellation is no longer possible.
   */
  processing = 'processing',
  /**
   * The refund has failed after processing. For example, the customer has closed his / her bank account. The funds will be returned to your account.
   */
  failed = 'failed',
  /**
   * The refund has been completed and your customer has either received the funds or the funds are on their way.
   */
  refunded = 'refunded',
}

export enum RefundEmbed {
  payment = 'payment',
}

export interface PaymentRefundLinks extends Links {
  /**
   * The API resource URL of the payment the refund belongs to.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=_links/payment#response
   */
  payment: Url;
  /**
   * The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=_links/settlement#response
   */
  settlement?: Url;
  /**
   * The API resource URL of the order the refund belongs to. Not present if the refund does not belong to an order.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=_links/order#response
   */
  order?: Url;
}

export interface RefundRoutingReversal {
  /**
   * The amount that will be pulled back.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=routingReversals/amount#response
   */
  amount: Amount;
  /**
   * Where the funds will be pulled back from.
   *
   * @see https://docs.mollie.com/reference/get-refund?path=routingReversals/source#response
   */
  source: {
    /**
     * The type of source. Currently only the source type `organization` is supported.
     */
    type: 'organization';
    /**
     * Required for source type `organization`. The ID of the connected organization the funds should be pulled back from.
     */
    organizationId: string;
  };
}
