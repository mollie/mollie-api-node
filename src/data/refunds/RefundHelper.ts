import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import breakUrl from '../../communication/breakUrl';
import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import undefinedPromise from '../../plumbing/undefinedPromise';
import type Callback from '../../types/Callback';
import type Maybe from '../../types/Maybe';
import Helper from '../Helper';
import type Order from '../orders/Order';
import { type OrderData } from '../orders/data';
import type Payment from '../payments/Payment';
import { type PaymentData } from '../payments/data';
import type Refund from './Refund';
import { type RefundData } from './data';

export default class RefundHelper extends Helper<RefundData, Refund> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: RefundData['_links'],
    protected readonly embedded: RefundData['_embedded'],
  ) {
    super(networkClient, links);
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
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(...breakUrl(this.links.payment.href));
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
    return (
      runIf(
        this.links.order,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.get<OrderData, Order>(pathname, query),
      ) ?? undefinedPromise
    );
  }
}
