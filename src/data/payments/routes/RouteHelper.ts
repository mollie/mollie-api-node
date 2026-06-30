import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import breakUrl from '../../../communication/breakUrl';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Helper from '../../Helper';
import type Payment from '../Payment';
import { type PaymentData } from '../data';
import type Route from './Route';
import { type RouteData } from './data';

export default class RouteHelper extends Helper<RouteData, Route> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: RouteData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the payment this route belongs to.
   *
   * @since 4.6.0
   */
  public getPayment(): Promise<Payment>;
  public getPayment(callback: Callback<Payment>): void;
  public getPayment() {
    if (renege(this, this.getPayment, ...arguments)) return;
    return this.networkClient.get<PaymentData, Payment>(...breakUrl(this.links.payment.href));
  }
}
