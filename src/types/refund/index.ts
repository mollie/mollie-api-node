import { IPaymentRefund } from '../paymentrefund';
import { IOrderRefund } from '../orderrefund';

export type IRefund = IPaymentRefund | IOrderRefund;

/**
 * Refund statuses
 *
 * @enum queued - The refund will be processed once you have enough balance. You can still cancel this refund.
 * @enum pending - The refund will be processed soon (usually the next business day). You can still cancel this refund.
 * @enum processing - The refund is being processed. Cancellation is no longer possible.
 * @enum refunded - The refund has been paid out to your customer.
 * @enun failed - The refund has failed during processing.
 */
export enum RefundStatus {
  queued = 'queued',
  pending = 'pending',
  processing = 'processing',
  refunded = 'refunded',
  failed = 'failed',
}
