import { runIf } from 'ruply';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import undefinedPromise from '../../plumbing/undefinedPromise';
import Callback from '../../types/Callback';
import Maybe from '../../types/Maybe';
import Helper from '../Helper';
import Order from '../orders/Order';
import { OrderData } from '../orders/data';
import Payment from '../payments/Payment';
import { PaymentData } from '../payments/data';
import Refund from './Refund';
import { RefundData, RefundStatus } from './data';
import resolveIf from '../../plumbing/resolveIf';

export default class RefundHelper extends Helper<RefundData, Refund> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: RefundData['_links'], protected readonly embedded: RefundData['_embedded']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the refund is queued due to a lack of balance. A queued refund can be canceled.
   *
   * @deprecated Use `refund.status == RefundStatus.queued` instead.
   */
  public isQueued(this: RefundData): boolean {
    return this.status === RefundStatus.queued;
  }

  /**
   * Returns whether the refund is ready to be sent to the bank. You can still cancel the refund if you like.
   *
   * @deprecated Use `refund.status == RefundStatus.pending` instead.
   */
  public isPending(this: RefundData): boolean {
    return this.status === RefundStatus.pending;
  }

  /**
   * Returns whether the refund is being processed. Cancellation is no longer possible if so.
   *
   * @deprecated Use `refund.status == RefundStatus.processing` instead.
   */
  public isProcessing(this: RefundData): boolean {
    return this.status === RefundStatus.processing;
  }

  /**
   * Returns whether the refund has been settled to your customer.
   *
   * @deprecated Use `refund.status == RefundStatus.refunded` instead.
   */
  public isRefunded(this: RefundData): boolean {
    return this.status === RefundStatus.refunded;
  }

  /**
   * Returns whether the refund has failed after processing.
   *
   * @deprecated Use `refund.status == RefundStatus.failed` instead.
   */
  public isFailed(this: RefundData): boolean {
    return this.status === RefundStatus.failed;
  }

  /**
   * Returns the payment this refund was created for.
   *
   * @since 3.6.0
   */
  public getPayment(): Promise<Payment>;
  public getPayment(callback: Callback<Array<Payment>>): void;
  public getPayment() {
    if (renege(this, this.getPayment, ...arguments)) return;
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(this.links.payment.href);
  }

  /**
   * Returns the order this refund belongs to.
   *
   * @since 3.6.0
   */
  public getOrder(): Promise<Order> | Promise<undefined>;
  public getOrder(callback: Callback<Maybe<Order>>): void;
  public getOrder() {
    if (renege(this, this.getOrder, ...arguments)) return;
    return runIf(this.links.order, ({ href }) => this.networkClient.get<OrderData, Order>(href)) ?? undefinedPromise;
  }
}
