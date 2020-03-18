import { Amount, Links, Url } from '../global';
import { OrderLineData } from '../orders/orderlines/OrderLine';
import Model from '../Model';
import { PaymentData } from '../payments/data';

/**
 * The `Refund` model
 *
 * {@link IRefund}
 */
export interface RefundData extends Model<'refund'> {
  amount: Amount;
  settlementAmount?: Amount;
  description: string;
  status: RefundStatus;
  lines?: OrderLineData[];
  paymentId: string;
  orderId?: string;
  createdAt: string;
  _links: PaymentRefundLinks;
  _embedded?: {
    payments?: Omit<PaymentData, '_embedded'>[];
  };
}

/**
 * Refund statuses
 *
 * @enum queued - The refund will be processed once you have enough balance. You can still cancel this refund.
 * @enum pending - The refund will be processed soon (usually the next business day). You can still cancel this refund.
 * @enum processing - The refund is being processed. Cancellation is no longer possible.
 * @enum refunded - The refund has been paid out to your customer.
 * @enum failed - The refund has failed during processing.
 */
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

/**
 * Payment Refund _links object
 *
 * @param payment - The API resource URL of the payment the refund belongs to.
 * @param settlement - The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.
 * @param order - The API resource URL of the order the refund belongs to. Not present if the refund does not belong to an order.
 */
export interface PaymentRefundLinks extends Links {
  payment: Url;
  settlement?: Url;
  order?: Url;
}
