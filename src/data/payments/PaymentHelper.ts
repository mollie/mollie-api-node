import renege from '../../plumbing/renege';
import undefinedPromise from '../../plumbing/undefinedPromise';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Maybe from '../../types/Maybe';
import Nullable from '../../types/Nullable';
import Chargeback, { ChargebackData } from '../chargebacks/Chargeback';
import { Amount, SequenceType } from '../global';
import Helper from '../Helper';
import { OrderData } from '../orders/data';
import Order from '../orders/Order';
import { RefundData } from '../refunds/data';
import Refund from '../refunds/Refund';
import Capture from './captures/Capture';
import { CaptureData } from './captures/data';
import { BankTransferLinks, PaymentData, PaymentStatus } from './data';
import Payment from './Payment';

export default class PaymentHelper extends Helper<PaymentData, Payment> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: PaymentData['_links'], protected readonly embedded: Payment['_embedded']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the payment has been created, but nothing else has happened with it yet.
   *
   * @deprecated Use `payment.status == PaymentStatus.open` instead.
   */
  public isOpen(this: PaymentData): boolean {
    return this.status === PaymentStatus.open;
  }

  /**
   * Returns whether new captures can be created for this payment.
   *
   * @deprecated Use `payment.status == PaymentStatus.authorized` instead.
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
   *
   * @deprecated Use `payment.status == PaymentStatus.canceled` instead.
   */
  public isCanceled(this: PaymentData): boolean {
    return this.status == PaymentStatus.canceled;
  }

  /**
   * Returns whether the payment has expired, e.g. the customer has abandoned the payment.
   *
   * @deprecated Use `payment.status == PaymentStatus.expired` instead.
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
  public getPaymentUrl(): Nullable<string> {
    return this.links.checkout?.href ?? null;
  }

  /**
   * Returns whether the payment has failed and cannot be completed with a different payment method.
   *
   * @deprecated Use `payment.status == PaymentStatus.failed` instead.
   */
  public isFailed(this: PaymentData): boolean {
    return this.status == PaymentStatus.failed;
  }

  /**
   * Returns whether the payment is in this temporary status that can occur when the actual payment process has been
   * started, but has not completed yet.
   *
   * @deprecated Use `payment.status == PaymentStatus.pending` instead.
   */
  public isPending(this: PaymentData): boolean {
    return this.status == PaymentStatus.pending;
  }

  /**
   * Returns whether there are refunds which belong to the payment.
   */
  public hasRefunds(): boolean {
    return this.links.refunds != undefined;
  }

  /**
   * Returns whether there are chargebacks which belong to the payment.
   */
  public hasChargebacks(): boolean {
    return this.links.chargebacks != undefined;
  }

  /**
   * Returns whether `sequenceType` is set to `'first'`. If a `'first'` payment has been completed successfully, the
   * consumer's account may be charged automatically using recurring payments.
   *
   * @deprecated Use `payment.sequenceType == SequenceType.first` instead.
   */
  public hasSequenceTypeFirst(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.first;
  }

  /**
   * Returns whether `sequenceType` is set to `'recurring'`. This type of payment is processed without involving the
   * consumer.
   *
   * @deprecated Use `payment.sequenceType == SequenceType.recurring` instead.
   */
  public hasSequenceTypeRecurring(this: PaymentData): boolean {
    return this.sequenceType == SequenceType.recurring;
  }

  /**
   * The URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * Recurring payments do not have a checkout URL.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/checkout#response
   */
  public getCheckoutUrl(): Nullable<string> {
    if (this.links.checkout == undefined) {
      return null;
    }
    return this.links.checkout.href;
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
   *
   * @deprecated Use `payment.amountRefunded` instead. To obtain the value, use `payment.amountRefunded?.value`.
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
   *
   * @deprecated Use `payment.amountRemaining` instead. To obtain the value, use `payment.amountRemaining?.value`.
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

  /**
   * Recurring payments do not have a checkout URL, because these payments are executed without any user interaction. This link is included for test mode recurring payments, and allows you to set the
   * final payment state for such payments.
   *
   * This link is also included for paid test mode payments. This allows you to create a refund or chargeback for the payment. This works for all payment types that can be charged back and/or
   * refunded.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/changePaymentState#response
   */
  public getChangePaymentStateUrl(): Nullable<string> {
    if (this.links.changePaymentState == undefined) {
      return null;
    }
    return this.links.changePaymentState.href;
  }

  /**
   * A link to a hosted payment page where your customer can finish the payment using an alternative payment method also activated on your website profile.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/payOnline#bank-transfer
   */
  public getPayOnlineUrl(): Nullable<string> {
    const links = this.links as Partial<BankTransferLinks>;
    if (links.payOnline == undefined) {
      return null;
    }
    return links.payOnline.href;
  }

  /**
   * A link to a hosted payment page where your customer can check the status of their payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/status#bank-transfer
   */
  public getStatusUrl(): Nullable<string> {
    const links = this.links as Partial<BankTransferLinks>;
    if (links.status == undefined) {
      return null;
    }
    return links.status.href;
  }

  /**
   * Returns all refunds created for the payment.
   *
   * @since 3.6.0
   */
  public getRefunds(): Promise<Array<Refund>>;
  public getRefunds(callback: Callback<Array<Refund>>): void;
  public getRefunds() {
    if (renege(this, this.getRefunds, ...arguments)) return;
    if (this.embedded?.refunds != undefined) {
      return Promise.resolve(this.embedded.refunds);
    }
    if (this.links.refunds == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<RefundData, Refund>(this.links.refunds.href, 'refunds');
  }

  /**
   * Returns all chargebacks issued for the payment.
   *
   * @since 3.6.0
   */
  public getChargebacks(): Promise<Array<Chargeback>>;
  public getChargebacks(callback: Callback<Array<Chargeback>>): void;
  public getChargebacks() {
    if (renege(this, this.getChargebacks, ...arguments)) return;
    if (this.embedded?.chargebacks != undefined) {
      return Promise.resolve(this.embedded.chargebacks);
    }
    if (this.links.chargebacks == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<ChargebackData, Chargeback>(this.links.chargebacks.href, 'chargebacks');
  }

  /**
   * Returns all captures that belong to the payment.
   *
   * @since 3.6.0
   */
  public getCaptures(): Promise<Array<Capture>>;
  public getCaptures(callback: Callback<Array<Capture>>): void;
  public getCaptures() {
    if (renege(this, this.getCaptures, ...arguments)) return;
    if (this.links.captures == undefined) {
      return Promise.resolve([]);
    }
    return this.networkClient.listPlain<CaptureData, Capture>(this.links.captures.href, 'captures');
  }

  /**
   * Returns the order this payment was created for.
   *
   * @since 3.6.0
   */
  public getOrder(): Promise<Order> | Promise<undefined>;
  public getOrder(callback: Callback<Maybe<Order>>): void;
  public getOrder() {
    if (renege(this, this.getOrder, ...arguments)) return;
    if (this.links.order == undefined) {
      return undefinedPromise;
    }
    return this.networkClient.get<OrderData, Order>(this.links.order.href);
  }
}
