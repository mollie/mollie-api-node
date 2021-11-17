import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import Callback from '../../types/Callback';
import Helper from '../Helper';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import Chargeback, { ChargebackData } from './Chargeback';

export default class ChargebackHelper extends Helper<ChargebackData, Chargeback> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: ChargebackData['_links'], protected readonly embedded: ChargebackData['_embedded']) {
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
    return resolveIf(this.embedded?.payment) ?? this.networkClient.get<PaymentData, Payment>(this.links.payment.href);
  }
}
