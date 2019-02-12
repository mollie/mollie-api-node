import { isPlainObject } from 'lodash';

import Model from '../model';
import { RefundStatus } from '../types/refund';
import { IRefund } from '../types/payment/refund';
import Payment from './Payment';

/**
 * The `Refund` model
 *
 * {@link IRefund}
 */
export default class Refund extends Model implements IRefund {
  public static resourcePrefix = 're_';

  public resource = 'refund';
  public id = null;
  public amount = {
    currency: null,
    value: null,
  };
  public settlementAmount = null;
  public description = null;
  public status = null;
  public createdAt = null;
  public paymentId = null;
  public _links = {
    payment: null,
    settlement: null,
    order: null,
    self: null,
    documentation: null,
  };
  public lines = null;
  public _embedded = null;
  public orderId = null;

  /**
   * Refund constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IRefund>) {
    super();

    Object.assign(this, props);

    if (this._embedded != null && isPlainObject(this._embedded)) {
      if (Array.isArray(this._embedded.payments)) {
        // eslint-disable-next-line array-callback-return
        this._embedded.payments.map((payment, key, payments) => {
          // eslint-disable-next-line no-param-reassign
          payments[key] = new Payment(payment);
        });
      }
    }
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
