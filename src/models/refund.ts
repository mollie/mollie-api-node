import Model from '../model';

/**
 * The `Refund` model
 */
export default class Refund extends Model {
  status: Mollie.RefundStatus;
  static STATUS_QUEUED = 'queued';
  static STATUS_PENDING = 'pending';
  static STATUS_PROCESSING = 'processing';
  static STATUS_REFUNDED = 'refunded';
  static STATUS_FAILED = 'failed';

  constructor(props?: Partial<Mollie.RefundResponse>) {
    super(props);

    const defaults: Mollie.RefundResponse = {
      resource: 'refund',
      id: null,
      amount: {
        currency: null,
        value: null,
      },
      settlementAmount: null,
      description: null,
      status: null,
      createdAt: null,
      paymentId: null,
      _links: {
        payment: null,
        settlement: null,
      },
    };

    Object.assign(this, defaults, props);
  }

  /**
   * The refund is queued until there is enough balance to process te refund. You can still cancel
   * the refund.
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
   * The refund has been sent to the bank. The refund amount will be transferred to the consumer
   * account as soon as possible.
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

  /**
   * The refund has failed during processing.
   * @returns {boolean}
   */
  isFailed() {
    return this.status === Refund.STATUS_FAILED;
  }
}
