import { RefundData, RefundStatus } from './data';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * The refund is queued until there is enough balance to process te refund.
   * You can still cancel the refund.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  isQueued: function isQueued(this: RefundData): boolean {
    return this.status === RefundStatus.queued;
  },

  /**
   * The refund will be sent to the bank on the next business day. You can still cancel the refund.
   *
   * @public ✓ This method is part of the public API
   */
  isPending: function isPending(this: RefundData): boolean {
    return this.status === RefundStatus.pending;
  },

  /**
   * The refund has been sent to the bank. The refund amount will be transferred to the consumer
   * account as soon as possible.
   *
   * @public ✓ This method is part of the public API
   */
  isProcessing: function isProcessing(this: RefundData): boolean {
    return this.status === RefundStatus.processing;
  },

  /**
   * The refund amount has been transferred to the consumer.
   *
   * @public ✓ This method is part of the public API
   */
  isRefunded: function isRefunded(this: RefundData): boolean {
    return this.status === RefundStatus.refunded;
  },

  /**
   * The refund has failed during processing.
   *
   * @public ✓ This method is part of the public API
   */
  isFailed: function isFailed(this: RefundData): boolean {
    return this.status === RefundStatus.failed;
  },
};
