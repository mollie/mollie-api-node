import Model from '../model';
import { IPaymentRefund } from '../types/paymentrefund';
import { RefundStatus } from '../types/refund';

/**
 * The `Refund` model
 */
export default class Refund extends Model implements IPaymentRefund {
  public static resourcePrefix = '';

  public resource = 'refund';
  public id: null;
  public amount: {
    currency: null;
    value: null;
  };
  public settlementAmount: null;
  public description: null;
  public status: null;
  public createdAt: null;
  public paymentId: null;
  public _links: {
    payment: null;
    settlement: null;
    order: null;
    self: null;
    documentation: null;
  };
  public lines: null;

  /**
   * Refund constructor
   *
   * @public ✓ This method is part of the public API
   */
  constructor(props?: Partial<IPaymentRefund>) {
    super(props);

    Object.assign(this, props);
  }

  /**
   * The refund is queued until there is enough balance to process te refund.
   * You can still cancel the refund.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isQueued(): boolean {
    return this.status === RefundStatus.queued;
  }

  /**
   * The refund will be sent to the bank on the next business day. You can still cancel the refund.
   *
   * @public ✓ This method is part of the public API
   */
  public isPending(): boolean {
    return this.status === RefundStatus.pending;
  }

  /**
   * The refund has been sent to the bank. The refund amount will be transferred to the consumer
   * account as soon as possible.
   *
   * @public ✓ This method is part of the public API
   */
  public isProcessing(): boolean {
    return this.status === RefundStatus.processing;
  }

  /**
   * The refund amount has been transferred to the consumer.
   *
   * @public ✓ This method is part of the public API
   */
  public isRefunded(): boolean {
    return this.status === RefundStatus.refunded;
  }

  /**
   * The refund has failed during processing.
   *
   * @public ✓ This method is part of the public API
   */
  public isFailed(): boolean {
    return this.status === RefundStatus.failed;
  }
}
