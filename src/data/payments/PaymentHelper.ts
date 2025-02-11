import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import breakUrl from '../../communication/breakUrl';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import makeAsync from '../../plumbing/iteration/makeAsync';
import renege from '../../plumbing/renege';
import undefinedPromise from '../../plumbing/undefinedPromise';
import type Callback from '../../types/Callback';
import type Maybe from '../../types/Maybe';
import type Nullable from '../../types/Nullable';
import { type ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import type Chargeback from '../chargebacks/Chargeback';
import { type ChargebackData } from '../chargebacks/Chargeback';
import type Order from '../orders/Order';
import { type OrderData } from '../orders/data';
import type Refund from '../refunds/Refund';
import { type RefundData } from '../refunds/data';
import type Payment from './Payment';
import type Capture from './captures/Capture';
import { type CaptureData } from './captures/data';
import { type BankTransferLinks, type PaymentData } from './data';

export default class PaymentHelper extends Helper<PaymentData, Payment> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: PaymentData['_links'],
    protected readonly embedded: Payment['_embedded'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns whether the payment is refundable.
   *
   * @since 2.0.0-rc.2
   * @deprecated Use `canBeRefunded` instead.
   */
  public isRefundable(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
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
   * The URL your customer should visit to make the payment. This is where you should redirect the consumer to.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/checkout#response
   */
  public getCheckoutUrl(): Nullable<string> {
    return this.links.checkout?.href ?? null;
  }

  /**
   * Returns the direct link to the payment in the Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/dashboard#response
   * @since 4.0.0
   */
  public getDashboardUrl(): string {
    return this.links.dashboard.href;
  }

  public canBeRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  }

  public canBePartiallyRefunded(this: PaymentData): boolean {
    return this.amountRemaining != undefined;
  }

  /**
   * Recurring payments do not have a checkout URL, because these payments are executed without any user interaction. This link is included for test mode recurring payments, and allows you to set the
   * final payment state for such payments.
   *
   * This link is also included for paid test mode payments. This allows you to create a refund or chargeback for the payment. This works for all payment types that can be charged back and/or
   * refunded.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/changePaymentState#response-parameters-for-recurring-payments
   */
  public getChangePaymentStateUrl(): Nullable<string> {
    return this.links.changePaymentState?.href ?? null;
  }

  /**
   * A link to a hosted payment page where your customer can finish the payment using an alternative payment method also activated on your website profile.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/payOnline#bank-transfer
   */
  public getPayOnlineUrl(): Nullable<string> {
    const links = this.links as Partial<BankTransferLinks>;
    return links.payOnline?.href ?? null;
  }

  /**
   * A link to a hosted payment page where your customer can check the status of their payment.
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment?path=_links/status#bank-transfer
   */
  public getStatusUrl(): Nullable<string> {
    const links = this.links as Partial<BankTransferLinks>;
    return links.status?.href ?? null;
  }

  /**
   * Returns all refunds created for the payment.
   *
   * @since 3.6.0
   */
  public getRefunds(parameters?: ThrottlingParameter): HelpfulIterator<Refund> {
    return (
      runIf(this.embedded?.refunds, refunds => new HelpfulIterator(makeAsync(refunds[Symbol.iterator]()))) ??
      runIf(
        this.links.refunds,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<RefundData, Refund>(pathname, 'refunds', query, parameters?.valuesPerMinute),
      ) ??
      emptyHelpfulIterator
    );
  }

  /**
   * Returns all chargebacks issued for the payment.
   *
   * @since 3.6.0
   */
  public getChargebacks(parameters?: ThrottlingParameter): HelpfulIterator<Chargeback> {
    return (
      runIf(this.embedded?.chargebacks, chargebacks => new HelpfulIterator(makeAsync(chargebacks[Symbol.iterator]()))) ??
      runIf(
        this.links.chargebacks,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<ChargebackData, Chargeback>(pathname, 'chargebacks', query, parameters?.valuesPerMinute),
      ) ??
      emptyHelpfulIterator
    );
  }

  /**
   * Returns all captures that belong to the payment.
   *
   * @since 3.6.0
   */
  public getCaptures(parameters?: ThrottlingParameter): HelpfulIterator<Capture> {
    return (
      runIf(this.embedded?.captures, captures => new HelpfulIterator(makeAsync(captures[Symbol.iterator]()))) ??
      runIf(
        this.links.captures,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<CaptureData, Capture>(pathname, 'captures', query, parameters?.valuesPerMinute),
      ) ??
      emptyHelpfulIterator
    );
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
    return (
      runIf(
        this.links.order,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.get<OrderData, Order>(pathname, query),
      ) ?? undefinedPromise
    );
  }
}
