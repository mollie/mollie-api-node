import { Amount, SequenceType } from '../global';
import { PaymentData, PaymentStatus } from './data';
import { get } from 'lodash';
import commonHelpers from '../commonHelpers';
import Nullable from '../../types/Nullable';

export default {
  ...commonHelpers,
  /**
   * If the payment is open
   */
  isOpen: function isOpen(this: PaymentData): boolean {
    return this.status === PaymentStatus.open;
  },

  /**
   * If the payment is authorized
   */
  isAuthorized: function isAuthorized(this: PaymentData): boolean {
    return this.status === PaymentStatus.authorized;
  },

  /**
   * If the payment is paid
   */
  isPaid: function isPaid(this: PaymentData): boolean {
    return this.paidAt != undefined;
  },

  /**
   * If the payment is canceled
   */
  isCanceled: function isCanceled(this: PaymentData): boolean {
    return this.status == PaymentStatus.canceled;
  },

  /**
   * If the payment is expired
   */
  isExpired: function isExpired(this: PaymentData): boolean {
    return this.status == PaymentStatus.expired;
  },

  /**
   * If the payment is refundable
   *
   * @since 2.0.0-rc.2
   */
  isRefundable: function isRefundable(this: PaymentData): boolean {
    return this.amountRemaining !== null;
  },

  /**
   * Get the payment URL
   */
  getPaymentUrl: function getPaymentUrl(this: PaymentData): string {
    return get(this._links, 'checkout.href', null);
  },

  /**
   * Returns whether the payment has failed and cannot be completed with a different payment method.
   */
  isFailed: function isFailed(this: PaymentData): boolean {
    return this.status == PaymentStatus.failed;
  },

  /**
   * Returns whether the payment is in this temporary status that can occur when the actual payment process has been
   * started, but has not completed yet.
   */
  isPending: function isPending(this: PaymentData): boolean {
    return this.status == PaymentStatus.pending;
  },

  /**
   * Returns whether there are refunds which belong to the payment.
   */
  hasRefunds: function hasRefunds(this: PaymentData): boolean {
    return this._links.refunds != undefined;
  },

  /**
   * Returns whether there are chargebacks which belong to the payment.
   */
  hasChargebacks: function hasChargebacks(this: PaymentData): boolean {
    return this._links.chargebacks != undefined;
  },

  /**
   * Returns whether `sequenceType` is set to `'first'`. If a `'first'` payment has been completed successfully, the
   * consumer's account may be charged automatically using recurring payments.
   */
  hasSequenceTypeFirst: function hasSequenceTypeFirst(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.first;
  },

  /**
   * Returns whether `sequenceType` is set to `'recurring'`. This type of payment is processed without involving the
   * consumer.
   */
  hasSequenceTypeRecurring: function hasSequenceTypeRecurring(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.recurring;
  },

  /**
   * Returns the URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * Recurring payments don’t have a checkout URL.
   */
  getCheckoutUrl: function getCheckoutUrl(this: PaymentData): Nullable<string> {
    if (this._links.checkout == undefined) {
      return null;
    }
    return this._links.checkout.href;
  },

  canBeRefunded: function canBeRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  },

  canBePartiallyRefunded: function canBePartiallyRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  },

  /**
   * Returns the total amount that is already refunded. For some payment methods, this amount may be higher than the
   * payment amount, for example to allow reimbursement of the costs for a return shipment to the customer.
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
