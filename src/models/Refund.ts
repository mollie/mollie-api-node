import Model from '../model';

/**
 * The `Refund` model
 */
export default class Refund extends Model implements Mollie.IPaymentRefund {
  public static resourcePrefix = '';
  resource: string;
  id: string;
  amount: Mollie.IAmount;
  status: Mollie.Refund.Status;
  createdAt: string;
  description: string;
  paymentId: string;
  settlementAmount?: Mollie.IAmount;
  _links: Mollie.ILinks;

  constructor(props?: Partial<Mollie.IPaymentRefund>) {
    super(props);

    const defaults: Mollie.IPaymentRefund = {
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
    return this.status === Mollie.Refund.Status.queued;
  }

  /**
   * The refund will be sent to the bank on the next business day. You can still cancel the refund.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isPending(): boolean {
    return this.status === Mollie.Refund.Status.pending;
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
    return this.status === Mollie.Refund.Status.processing;
  }

  /**
   * The refund amount has been transferred to the consumer.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isRefunded(): boolean {
    return this.status === Mollie.Refund.Status.refunded;
  }

  /**
   * The refund has failed during processing.
   *
   * @returns {boolean}
   *
   * @public ✓ This method is part of the public API
   */
  public isFailed(): boolean {
    return this.status === Mollie.Refund.Status.failed;
  }
}
