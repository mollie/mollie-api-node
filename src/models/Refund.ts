import Model from '../model';
import { IAmount, ILinks } from '../types/global';
import { IPaymentRefund } from '../types/paymentrefund';
import { RefundStatus } from '../types/refund';

/**
 * The `Refund` model
 */
export default class Refund extends Model implements IPaymentRefund {
  public static resourcePrefix = '';
  resource: string;
  id: string;
  amount: IAmount;
  status: RefundStatus;
  createdAt: string;
  description: string;
  paymentId: string;
  settlementAmount?: IAmount;
  _links: ILinks;

  constructor(props?: Partial<IPaymentRefund>) {
    super(props);

    const defaults: IPaymentRefund = {
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
   * @returns {boolean}
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
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isProcessing(): boolean {
    return this.status === RefundStatus.processing;
  }

  /**
   * The refund amount has been transferred to the consumer.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isRefunded(): boolean {
    return this.status === RefundStatus.refunded;
  }

  /**
   * The refund has failed during processing.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isFailed(): boolean {
    return this.status === RefundStatus.failed;
  }
}
