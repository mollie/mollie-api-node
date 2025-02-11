import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import breakUrl from '../../communication/breakUrl';
import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import type Callback from '../../types/Callback';
import Helper from '../Helper';
import type Payment from '../payments/Payment';
import { type PaymentData } from '../payments/data';
import type Chargeback from './Chargeback';
import { type ChargebackData } from './Chargeback';

export default class ChargebackHelper extends Helper<ChargebackData, Chargeback> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: ChargebackData['_links'],
    protected readonly embedded: ChargebackData['_embedded'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the payment this chargeback was issued for.
   *
   * @since 3.6.0
   */
  public getPayment(): Promise<Payment>;
  public getPayment(callback: Callback<Array<Payment>>): void;
  public getPayment() {
    if (renege(this, this.getPayment, ...arguments)) return;
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(...breakUrl(this.links.payment.href));
  }
}
