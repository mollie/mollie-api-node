import { get, isPlainObject } from 'lodash';

import Model from '../model';
import Chargeback from '../models/Chargeback';
import Refund from '../models/Refund';
import { IPayment, PaymentStatus } from '../types/payment';
import { SequenceType, IUrl, IAmount } from '../types/global';

/**
 * The `Payment` model
 *
 * {@link IPayment}
 */
export default class Payment extends Model implements IPayment {
  public static readonly resourcePrefix = 'tr_';

  public resource: 'payment';
  public id: null;
  public mode: null;
  public createdAt: null;
  public status: null;
  public isCancelable: null;
  public paidAt: null;
  public canceledAt: null;
  public expiresAt: null;
  public expiredAt: null;
  public failedAt: null;
  public amount: {
    value: null;
    currency: null;
  };
  public amountRefunded: null;
  public amountRemaining: null;
  public description: null;
  public redirectUrl: null;
  public webhookUrl: null;
  public method: null;
  public metadata: null;
  public locale: null;
  public countryCode: null;
  public profileId: null;
  public settlementAmount: null;
  public settlementId: null;
  public customerId: null;
  public sequenceType: null;
  public mandateId: null;
  public subscriptionId: null;
  public applicationFee: {
    amount: {
      value: null;
      currency: null;
    };
    description: null;
  };
  public details: null;
  public _links: {
    self: null;
    documentation: null;
    checkout: null;
    refunds: null;
    chargebacks: null;
    captures: null;
    order: null;
    settlement: null;
    mandate: null;
    subscription: null;
    customer: null;
  };
  public _embedded = null;
  public amountCaptured = null;
  public orderId = null;

  /**
   * Payment constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<IPayment>) {
    super();

    Object.assign(this, props);

    if (isPlainObject(this._embedded)) {
      if (Array.isArray(this._embedded.refunds)) {
        this._embedded.refunds.forEach((refund, key, refunds) => {
          // eslint-disable-next-line no-param-reassign
          refunds[key] = new Refund(refund);
        });
      }
      if (Array.isArray(this._embedded.chargebacks)) {
        this._embedded.chargebacks.forEach((chargeback, key, chargebacks) => {
          // eslint-disable-next-line no-param-reassign
          chargebacks[key] = new Chargeback(chargeback);
        });
      }
    }
  }

  /**
   * If the payment is open
   *
   * @public ✓ This method is part of the public API
   */
  public isOpen(): boolean {
    return this.status === PaymentStatus.open;
  }

  /**
   * If the payment is authorized
   *
   * @public ✓ This method is part of the public API
   */
  public isAuthorized(): boolean {
    return this.status === PaymentStatus.authorized;
  }

  /**
   * If the payment is paid
   *
   * @public ✓ This method is part of the public API
   */
  public isPaid(): boolean {
    return !!this.paidAt;
  }

  /**
   * If the payment is canceled
   *
   * @public ✓ This method is part of the public API
   */
  public isCanceled(): boolean {
    return PaymentStatus.canceled == this.status;
  }

  /**
   * If the payment is expired
   *
   * @public ✓ This method is part of the public API
   */
  public isExpired(): boolean {
    return PaymentStatus.expired == this.status;
  }

  /**
   * If the payment is refundable
   *
   * @public ✓ This method is part of the public API
   *
   * @since 2.0.0-rc.2
   */
  public isRefundable(): boolean {
    return this.amountRemaining !== null;
  }

  /**
   * Get the payment URL
   *
   * @public ✓ This method is part of the public API
   */
  public getPaymentUrl(): string {
    return get(this._links, 'checkout.href', null);
  }

  /**
   * Returns whether the payment has failed and cannot be completed with a different payment method.
   *
   * @public ✓ This method is part of the public API
   */
  public isFailed(): boolean {
    return PaymentStatus.failed == this.status;
  }

  /**
   * Returns whether the payment is in this temporary status that can occur when the actual payment process has been
   * started, but has not completed yet.
   *
   * @public ✓ This method is part of the public API
   */
  public isPending(): boolean {
    return PaymentStatus.pending == this.status;
  }

  /**
   * Returns whether there are refunds which belong to the payment.
   *
   * @public ✓ This method is part of the public API
   */
  public hasRefunds(): boolean {
    return undefined != this._links.refunds;
  }

  /**
   * Returns whether there are chargebacks which belong to the payment.
   *
   * @public ✓ This method is part of the public API
   */
  public hasChargebacks(): boolean {
    return undefined != this._links.chargebacks;
  }

  /**
   * Returns whether `sequenceType` is set to `'first'`. If a `'first'` payment has been completed successfully, the
   * consumer's account may be charged automatically using recurring payments.
   *
   * @public ✓ This method is part of the public API
   */
  public hasSequenceTypeFirst(): boolean {
    return SequenceType.first == this.sequenceType;
  }

  /**
   * Returns whether `sequenceType` is set to `'recurring'`. This type of payment is processed without involving the
   * consumer.
   *
   * @public ✓ This method is part of the public API
   */
  public hasSequenceTypeRecurring(): boolean {
    return SequenceType.recurring == this.sequenceType;
  }

  /**
   * Returns the checkout URL where the customer can complete the payment.
   *
   * @public ✓ This method is part of the public API
   */
  public getCheckoutUrl(): string | null {
    if (undefined == this._links.checkout) {
      return null;
    } /* if (undefined != this._links.checkout) */ else {
      return (this._links.checkout as IUrl).href;
    }
  }

  /**
   * @public ✓ This method is part of the public API
   */
  public canBeRefunded(): boolean {
    return undefined != this.amountRemaining;
  }

  /**
   * @public ✓ This method is part of the public API
   */
  public canBePartiallyRefunded(): boolean {
    return this.canBeRefunded();
  }

  /**
   * Returns the total amount that is already refunded. For some payment methods, this amount may be higher than the
   * payment amount, for example to allow reimbursement of the costs for a return shipment to the customer.
   *
   * @public ✓ This method is part of the public API
   */
  public getAmountRefunded(): number {
    if (undefined == this.amountRefunded) {
      return 0;
    } else {
      /* if (undefined != this.amountRefunded) */
      return parseFloat((this.amountRefunded as IAmount).value);
    }
  }

  /**
   * Returns the remaining amount that can be refunded.
   *
   * @public ✓ This method is part of the public API
   */
  public getAmountRemaining(): number {
    if (undefined == this.amountRemaining) {
      return 0;
    } else {
      /* if (undefined != this.amountRemaining) */
      return parseFloat((this.amountRemaining as IAmount).value);
    }
  }
}
