import { IPaymentRefund } from '../paymentrefund';
import { IOrderRefund } from '../orderrefund';

export type IRefund = IPaymentRefund | IOrderRefund;

export enum RefundStatus {
  queued = 'queued',
  pending = 'pending',
  processing = 'processing',
  refunded = 'refunded',
  failed = 'failed',
}
