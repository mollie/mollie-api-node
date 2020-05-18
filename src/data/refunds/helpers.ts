import { RefundData, RefundStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * The refund is queued until there is enough balance to process te refund.
   * You can still cancel the refund.
   */
  isQueued: function isQueued(this: RefundData): boolean {
    return this.status === RefundStatus.queued;
  },

  /**
   * The refund will be sent to the bank on the next business day. You can still cancel the refund.
   */
  isPending: function isPending(this: RefundData): boolean {
    return this.status === RefundStatus.pending;
  },

  /**
   * The refund has been sent to the bank. The refund amount will be transferred to the consumer
   * account as soon as possible.
   */
  isProcessing: function isProcessing(this: RefundData): boolean {
    return this.status === RefundStatus.processing;
  },

  /**
   * The refund amount has been transferred to the consumer.
   */
  isRefunded: function isRefunded(this: RefundData): boolean {
    return this.status === RefundStatus.refunded;
  },

  /**
   * The refund has failed during processing.
   */
  isFailed: function isFailed(this: RefundData): boolean {
    return this.status === RefundStatus.failed;
  },
};
