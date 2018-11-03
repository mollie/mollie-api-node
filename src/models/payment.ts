import Model from '../model';

/**
 * The `Payment` model
 */
export default class Payment extends Model implements Mollie.PaymentResponse {
  resource: string;
  id: string;
  mode: Mollie.ApiMode;
  createdAt: string;
  status: Mollie.PaymentStatus;
  isCancelable: boolean;
  authorizedAt?: string;
  paidAt?: string;
  canceledAt?: string;
  expiresAt: string;
  expiredAt?: string;
  failedAt?: string;
  amount: Mollie.Amount;
  amountRefunded?: Mollie.Amount;
  amountRemaining?: Mollie.Amount;
  amountCaptured?: Mollie.Amount;
  description: string;
  redirectUrl: string | null;
  webhookUrl?: string;
  method: Mollie.Method;
  metadata: any;
  locale: Mollie.Locale;
  countryCode?: string;
  profileId: string;
  settlementAmount?: Mollie.Amount;
  settlementId?: string;
  customerId?: string;
  sequenceType: string;
  mandateId?: string;
  subscriptionId?: string;
  orderId?: string;
  details?: any;
  applicationFee?: {
    amount: Mollie.Amount;
    description: string;
  };
  _links: Mollie.Links;

  static STATUS_OPEN = 'open';
  static STATUS_PENDING = 'pending';
  static STATUS_CANCELED = 'canceled';
  static STATUS_EXPIRED = 'expired';
  static STATUS_PAID = 'paid';
  static STATUS_FAILED = 'failed';
  static STATUS_AUTHORIZED = 'authorized';

  static SEQUENCETYPE_ONEOFF = 'oneoff';
  static SEQUENCETYPE_FIRST = 'first';
  static SEQUENCETYPE_RECURRING = 'recurring';

  constructor(props?: Partial<Mollie.PaymentResponse>) {
    super(props);

    const defaults: Partial<Mollie.PaymentResponse> = {
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
   * @returns {boolean}
   */
  isOpen() {
    return this.status === Payment.STATUS_OPEN;
  }

  /**
   * If the payment is authorized
   * @returns {boolean}
   */
  isAuthorized() {
    return this.status === Payment.STATUS_AUTHORIZED;
  }

  /**
   * If the payment is paid
   * @returns {boolean}
   */
  isPaid() {
    return !!this.paidAt;
  }

  /**
   * If the payment is canceled
   * @returns {boolean}
   */
  isCanceled() {
    return !!this.canceledAt;
  }

  /**
   * If the payment is expired
   * @returns {boolean}
   */
  isExpired() {
    return !!this.expiredAt;
  }

  /**
   * If the payment is refundable
   * @returns {boolean}
   * @since 2.0.0-rc.2
   */
  isRefundable() {
    return this.amountRemaining !== null;
  }

  /**
   * Get the payment URL
   * @returns {string|null}
   */
  getPaymentUrl() {
    return this._links && this._links.checkout && this._links.checkout.href;
  }
}
