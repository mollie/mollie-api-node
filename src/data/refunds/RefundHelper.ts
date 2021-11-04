import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import undefinedPromise from '../../plumbing/undefinedPromise';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Helper from '../Helper';
import { OrderData } from '../orders/data';
import Order from '../orders/Order';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import { RefundData, RefundStatus } from './data';
import Refund from './Refund';

export default class RefundHelper extends Helper<RefundData, Refund> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: RefundData['_links'], protected readonly embedded: RefundData['_embedded']) {
    super(networkClient, links);
  }

  /**
   * Returns whether the refund is queued due to a lack of balance. A queued refund can be canceled.
   */
  public isQueued(this: RefundData): boolean {
    return this.status === RefundStatus.queued;
  }

  /**
   * Returns whether the refund is ready to be sent to the bank. You can still cancel the refund if you like.
   */
  public isPending(this: RefundData): boolean {
    return this.status === RefundStatus.pending;
  }

  /**
   * Returns whether the refund is being processed. Cancellation is no longer possible if so.
   */
  public isProcessing(this: RefundData): boolean {
    return this.status === RefundStatus.processing;
  }

  /**
   * Returns whether the refund has been settled to your customer.
   */
  public isRefunded(this: RefundData): boolean {
    return this.status === RefundStatus.refunded;
  }

  /**
   * Returns whether the refund has failed after processing.
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
  public getOrder(callback: Callback<Order | undefined>): void;
  public getOrder() {
    if (renege(this, this.getOrder, ...arguments)) return;
    if (this.links.order == undefined) {
      return undefinedPromise;
    }
    return this.networkClient.get<OrderData, Order>(this.links.order.href);
  }
}
