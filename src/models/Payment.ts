import { get } from 'lodash';

import Model from '../model';
import { IPayment, PaymentStatus } from '../types/payment';

/**
 * The `Payment` model
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

  /**
   * Payment constructor
   *
   * @public ✓ This method is part of the public API
   */
  public constructor(props?: Partial<IPayment>) {
    super(props);

    Object.assign(this, props);
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
    return !!this.canceledAt;
  }

  /**
   * If the payment is expired
   *
   * @public ✓ This method is part of the public API
   */
  public isExpired(): boolean {
    return !!this.expiredAt;
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
    return get(this._links, 'checkout.href', '');
  }
}
