import MollieModel from 'mollie-model';

/**
 * The `Refund` model
 */
export default class Refund extends MollieModel {
  static STATUS_QUEUED = 'queued';
  static STATUS_PENDING = 'pending';
  static STATUS_PROCESSING = 'processing';
  static STATUS_REFUNDED = 'refunded';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'refund',
      id: null,
      payment: null,
      amount: null,
      status: null,
      refundedDatetime: null,
    };

    Object.assign(this, defaults, props);
  }

  /**
   * The refund is queued until there is enough balance to process te refund. You can still cancel the refund.
   * @returns {boolean}
   */
  isQueued() {
    return this.status === Refund.STATUS_QUEUED;
  }
  
  /**
   * The refund will be sent to the bank on the next business day. You can still cancel the refund.
   * @returns {boolean}
   */
  isPending() {
    return this.status === Refund.STATUS_PENDING;
  }

  /**
   * The refund has been sent to the bank. The refund amount will be transferred to the consumer account as soon as possible.
   * @returns {boolean}
   */
  isProcessing() {
    return this.status === Refund.STATUS_PROCESSING;
  }

  /**
   * The refund amount has been transferred to the consumer.
   * @returns {boolean}
   */
  isRefunded() {
    return this.status === Refund.STATUS_REFUNDED;
  }
}
