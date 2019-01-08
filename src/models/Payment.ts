import Model from '../model';
import { IPayment, PaymentStatus } from '../types/payment';
import { ApiMode, IAmount, ILinks, Locale, PaymentMethod } from '../types/global';

/**
 * The `Payment` model
 */
export default class Payment extends Model implements IPayment {
  public static readonly resourcePrefix = 'tr_';
  public resource: string;
  public id: string;

  public mode: ApiMode;
  public createdAt: string;
  public status: PaymentStatus;
  public isCancelable: boolean;
  public authorizedAt?: string;
  public paidAt?: string;
  public canceledAt?: string;
  public expiresAt: string;
  public expiredAt?: string;
  public failedAt?: string;
  public amount: IAmount;
  public amountRefunded?: IAmount;
  public amountRemaining?: IAmount;
  public amountCaptured?: IAmount;
  public description: string;
  public redirectUrl: string | null;
  public webhookUrl?: string;
  public method: PaymentMethod;
  public metadata: any;
  public locale: Locale;
  public countryCode?: string;
  public profileId: string;
  public settlementAmount?: IAmount;
  public settlementId?: string;
  public customerId?: string;
  public sequenceType: string;
  public mandateId?: string;
  public subscriptionId?: string;
  public orderId?: string;
  public details?: any;
  public applicationFee?: {
    amount: IAmount;
    description: string;
  };
  public _links: ILinks;

  constructor(props?: Partial<IPayment>) {
    super(props);

    const defaults: Partial<IPayment> = {
      resource: 'payment',
      id: null,
      mode: null,
      createdAt: null,
      status: null,
      isCancelable: null,
      paidAt: null,
      canceledAt: null,
      expiresAt: null,
      expiredAt: null,
      failedAt: null,
      amount: {
        value: null,
        currency: null,
      },
      amountRefunded: null,
      amountRemaining: null,
      description: null,
      redirectUrl: null,
      webhookUrl: null,
      method: null,
      metadata: null,
      locale: null,
      countryCode: null,
      profileId: null,
      settlementAmount: null,
      settlementId: null,
      customerId: null,
      sequenceType: null,
      mandateId: null,
      subscriptionId: null,
      applicationFee: {
        amount: {
          value: null,
          currency: null,
        },
        description: null,
      },
      details: null,
      _links: {
        checkout: null,
        refunds: null,
        chargebacks: null,
        settlement: null,
        mandate: null,
        subscription: null,
        customer: null,
      },
    };

    Object.assign(this, defaults, props);
  }

  /**
   * If the payment is open
   *
   * @returns {boolean}
   */
  isOpen() {
    return this.status === PaymentStatus.open;
  }

  /**
   * If the payment is authorized
   *
   * @returns {boolean}
   */
  isAuthorized() {
    return this.status === PaymentStatus.authorized;
  }

  /**
   * If the payment is paid
   *
   * @returns {boolean}
   */
  isPaid() {
    return !!this.paidAt;
  }

  /**
   * If the payment is canceled
   *
   * @returns {boolean}
   */
  isCanceled() {
    return !!this.canceledAt;
  }

  /**
   * If the payment is expired
   *
   * @returns {boolean}
   */
  isExpired() {
    return !!this.expiredAt;
  }

  /**
   * If the payment is refundable
   *
   * @returns {boolean}
   *
   * @since 2.0.0-rc.2
   */
  isRefundable() {
    return this.amountRemaining !== null;
  }

  /**
   * Get the payment URL
   *
   * @returns {string|null}
   */
  getPaymentUrl() {
    return this._links && this._links.checkout && this._links.checkout.href;
  }
}
