import MollieModel from 'mollie-model';

/**
 * The `Payment` model
 */
export default class Payment extends MollieModel {
  static STATUS_OPEN = 'open';
  static STATUS_PENDING = 'pending';
  static STATUS_CANCELLED = 'cancelled';
  static STATUS_EXPIRED = 'expired';
  static STATUS_PAID = 'paid';
  static STATUS_FAILED = 'failed';

  static RECURRINGTYPE_NONE = null;
  static RECURRINGTYPE_FIRST = 'first';
  static RECURRINGTYPE_RECURRING = 'recurring';

  constructor(props) {
    super(props);

    const defaults = {
      resource: 'payment',
      id: null,
      mode: null,
      amount: null,
      amountRefunded: null,
      amountRemaining: null,
      description: null,
      method: null,
      status: null,
      createdDatetime: null,
      paidDatetime: null,
      cancelledDatetime: null,
      expiredDatetime: null,
      expiryPeriod: null,
      metadata: null,
      details: null,
      locale: null,
      profileId: null,
      customerId: null,
      recurringType: null,
      mandateId: null,
      settlementId: null,
      subscriptionId: null,
      links: {
        paymentUrl: null,
        webhookUrl: null,
        redirectUrl: null,
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
   * If the payment is paid
   * @returns {boolean}
   */
  isPaid() {
    return !!this.paidDatetime;
  }

  /**
   * If the payment is cancelled
   * @returns {boolean}
   */
  isCancelled() {
    return !!this.cancelledDatetime;
  }

  /**
   * If the payment is expired
   * @returns {boolean}
   */
  isExpired() {
    return !!this.expiredDatetime;
  }

  /**
   * Get the payment URL
   * @returns {links|{paymentUrl, webhookUrl, redirectUrl}|Array|HTMLCollection|*|null}
   */
  getPaymentUrl() {
    return this.links && this.links.paymentUrl;
  }
}
