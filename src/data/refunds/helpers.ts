import { RefundData, RefundStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * Returns whether the refund is queued due to a lack of balance. A queued refund can be canceled.
   */
  isQueued: function isQueued(this: RefundData): boolean {
    return this.status === RefundStatus.queued;
  },

  /**
   * Returns whether the refund is ready to be sent to the bank. You can still cancel the refund if you like.
   */
  isPending: function isPending(this: RefundData): boolean {
    return this.status === RefundStatus.pending;
  },

  /**
   * Returns whether the refund is being processed. Cancellation is no longer possible if so.
   */
  isProcessing: function isProcessing(this: RefundData): boolean {
    return this.status === RefundStatus.processing;
  },

  /**
   * Returns whether the refund has been settled to your customer.
   */
  isRefunded: function isRefunded(this: RefundData): boolean {
    return this.status === RefundStatus.refunded;
  },

  /**
   * Returns whether the refund has failed after processing.
   */
  isFailed: function isFailed(this: RefundData): boolean {
    return this.status === RefundStatus.failed;
  },
};
