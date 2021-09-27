import { Amount, SequenceType } from '../global';
import { PaymentData, PaymentStatus } from './data';
import { get } from 'lodash';
import Nullable from '../../types/Nullable';
import Payment from './Payment';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Helper from '../Helper';

export default class PaymentHelper extends Helper<PaymentData, Payment> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: PaymentData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the payment has been created, but nothing else has happened with it yet.
   */
  public isOpen(this: PaymentData): boolean {
    return this.status === PaymentStatus.open;
  }

  /**
   * Returns whether new captures can be created for this payment.
   */
  public isAuthorized(this: PaymentData): boolean {
    return this.status === PaymentStatus.authorized;
  }

  /**
   * Returns whether the payment is successfully paid.
   */
  public isPaid(this: PaymentData): boolean {
    return this.paidAt != undefined;
  }

  /**
   * Returns whether the payment has been canceled by the customer.
   */
  public isCanceled(this: PaymentData): boolean {
    return this.status == PaymentStatus.canceled;
  }

  /**
   * Returns whether the payment has expired, e.g. the customer has abandoned the payment.
   */
  public isExpired(this: PaymentData): boolean {
    return this.status == PaymentStatus.expired;
  }

  /**
   * Returns whether the payment is refundable.
   *
   * @since 2.0.0-rc.2
   */
  public isRefundable(this: PaymentData): boolean {
    return this.amountRemaining !== null;
  }

  /**
   * Returns the URL the customer should visit to make the payment. This is to where you should redirect the consumer.
   */
  public getPaymentUrl(this: PaymentData): string {
    return get(this._links, 'checkout.href', null);
  }

  /**
   * Returns whether the payment has failed and cannot be completed with a different payment method.
   */
  public isFailed(this: PaymentData): boolean {
    return this.status == PaymentStatus.failed;
  }

  /**
   * Returns whether the payment is in this temporary status that can occur when the actual payment process has been
   * started, but has not completed yet.
   */
  public isPending(this: PaymentData): boolean {
    return this.status == PaymentStatus.pending;
  }

  /**
   * Returns whether there are refunds which belong to the payment.
   */
  public hasRefunds(this: PaymentData): boolean {
    return this._links.refunds != undefined;
  }

  /**
   * Returns whether there are chargebacks which belong to the payment.
   */
  public hasChargebacks(this: PaymentData): boolean {
    return this._links.chargebacks != undefined;
  }

  /**
   * Returns whether `sequenceType` is set to `'first'`. If a `'first'` payment has been completed successfully, the
   * consumer's account may be charged automatically using recurring payments.
   */
  public hasSequenceTypeFirst(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.first;
  }

  /**
   * Returns whether `sequenceType` is set to `'recurring'`. This type of payment is processed without involving the
   * consumer.
   */
  public hasSequenceTypeRecurring(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.recurring;
  }

  /**
   * Returns the URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * Recurring payments don’t have a checkout URL.
   */
  public getCheckoutUrl(this: PaymentData): Nullable<string> {
    if (this._links.checkout == undefined) {
      return null;
    }
    return this._links.checkout.href;
  }

  public canBeRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  }

  public canBePartiallyRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  }

  /**
   * Returns the total amount that is already refunded. For some payment methods, this amount may be higher than the
   * payment amount, for example to allow reimbursement of the costs for a return shipment to the customer.
   */
  public getAmountRefunded(this: PaymentData): Amount {
    if (this.amountRefunded == undefined) {
      return {
        // Perhaps this zero-value should depend on the currency. If the currency is JPY (¥), for instance, the value
        // should probably be "0"; not "0.00".
        value: '0.00',
        currency: this.amount.currency,
      };
    }
    return this.amountRefunded;
  }

  /**
   * Returns the remaining amount that can be refunded.
   */
  public getAmountRemaining(this: PaymentData): Amount {
    if (this.amountRemaining == undefined) {
      return {
        // Perhaps this zero-value should depend on the currency. If the currency is JPY (¥), for instance, the value
        // should probably be "0"; not "0.00".
        value: '0.00',
        currency: this.amount.currency,
      };
    }
    return this.amountRemaining;
  }
}
