import Model from './base';

/**
 * The `Refund` model
 */
export default class Refund extends Model {
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
   * If refund is pending
   * @returns {boolean}
   */
  isPending() {
    return this.status === Refund.STATUS_PENDING;
  }

  /**
   * If refund is processing
   * @returns {boolean}
   */
  isProcessing() {
    return this.status === Refund.STATUS_PROCESSING;
  }

  /**
   * If refund is refunded
   * @returns {boolean}
   */
  isRefunded() {
    return !!this.refundedDatetime;
  }
}
