import { get } from 'lodash';
import { PaymentData, PaymentStatus } from './data';
import { SequenceType, Amount } from '../global';
import commonHelpers from '../commonHelpers';

export default {
  ...commonHelpers,
  /**
   * If the payment is open
   *
   * @public ✓ This method is part of the public API
   */
  isOpen: function isOpen(this: PaymentData): boolean {
    return this.status === PaymentStatus.open;
  },

  /**
   * If the payment is authorized
   *
   * @public ✓ This method is part of the public API
   */
  isAuthorized: function isAuthorized(this: PaymentData): boolean {
    return this.status === PaymentStatus.authorized;
  },

  /**
   * If the payment is paid
   *
   * @public ✓ This method is part of the public API
   */
  isPaid: function isPaid(this: PaymentData): boolean {
    return this.paidAt != undefined;
  },

  /**
   * If the payment is canceled
   *
   * @public ✓ This method is part of the public API
   */
  isCanceled: function isCanceled(this: PaymentData): boolean {
    return this.status == PaymentStatus.canceled;
  },

  /**
   * If the payment is expired
   *
   * @public ✓ This method is part of the public API
   */
  isExpired: function isExpired(this: PaymentData): boolean {
    return this.status == PaymentStatus.expired;
  },

  /**
   * If the payment is refundable
   *
   * @public ✓ This method is part of the public API
   *
   * @since 2.0.0-rc.2
   */
  isRefundable: function isRefundable(this: PaymentData): boolean {
    return this.amountRemaining !== null;
  },

  /**
   * Get the payment URL
   *
   * @public ✓ This method is part of the public API
   */
  getPaymentUrl: function getPaymentUrl(this: PaymentData): string {
    return get(this._links, 'checkout.href', null);
  },

  /**
   * Returns whether the payment has failed and cannot be completed with a different payment method.
   *
   * @public ✓ This method is part of the public API
   */
  isFailed: function isFailed(this: PaymentData): boolean {
    return this.status == PaymentStatus.failed;
  },

  /**
   * Returns whether the payment is in this temporary status that can occur when the actual payment process has been
   * started, but has not completed yet.
   *
   * @public ✓ This method is part of the public API
   */
  isPending: function isPending(this: PaymentData): boolean {
    return this.status == PaymentStatus.pending;
  },

  /**
   * Returns whether there are refunds which belong to the payment.
   *
   * @public ✓ This method is part of the public API
   */
  hasRefunds: function hasRefunds(this: PaymentData): boolean {
    return this._links.refunds != undefined;
  },

  /**
   * Returns whether there are chargebacks which belong to the payment.
   *
   * @public ✓ This method is part of the public API
   */
  hasChargebacks: function hasChargebacks(this: PaymentData): boolean {
    return this._links.chargebacks != undefined;
  },

  /**
   * Returns whether `sequenceType` is set to `'first'`. If a `'first'` payment has been completed successfully, the
   * consumer's account may be charged automatically using recurring payments.
   *
   * @public ✓ This method is part of the public API
   */
  hasSequenceTypeFirst: function hasSequenceTypeFirst(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.first;
  },

  /**
   * Returns whether `sequenceType` is set to `'recurring'`. This type of payment is processed without involving the
   * consumer.
   *
   * @public ✓ This method is part of the public API
   */
  hasSequenceTypeRecurring: function hasSequenceTypeRecurring(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.recurring;
  },

  /**
   * Returns the URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * Recurring payments don’t have a checkout URL.
   *
   * @public ✓ This method is part of the public API
   */
  getCheckoutUrl: function getCheckoutUrl(this: PaymentData): string | null {
    if (this._links.checkout == undefined) {
      return null;
    }
    return this._links.checkout.href;
  },

  /**
   * @public ✓ This method is part of the public API
   */
  canBeRefunded: function canBeRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  },

  /**
   * @public ✓ This method is part of the public API
   */
  canBePartiallyRefunded: function canBePartiallyRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  },

  /**
   * Returns the total amount that is already refunded. For some payment methods, this amount may be higher than the
   * payment amount, for example to allow reimbursement of the costs for a return shipment to the customer.
   *
   * @public ✓ This method is part of the public API
   */
  getAmountRefunded: function getAmountRefunded(this: PaymentData): Amount {
    if (this.amountRefunded == undefined) {
      return {
        // Perhaps this zero-value should depend on the currency. If the currency is JPY (¥), for instance, the value
        // should probably be "0"; not "0.00".
        value: '0.00',
        currency: this.amount.currency,
      };
    }
    return this.amountRefunded;
  },

  /**
   * Returns the remaining amount that can be refunded.
   *
   * @public ✓ This method is part of the public API
   */
  getAmountRemaining: function getAmountRemaining(this: PaymentData): Amount {
    if (this.amountRemaining == undefined) {
      return {
        // Perhaps this zero-value should depend on the currency. If the currency is JPY (¥), for instance, the value
        // should probably be "0"; not "0.00".
        value: '0.00',
        currency: this.amount.currency,
      };
    }
    return this.amountRemaining;
  },
};
