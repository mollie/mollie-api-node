import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Helper from '../Helper';
import { type PaymentLinkData } from './data';
import type PaymentLink from './PaymentLink';

export default class PaymentLinkHelper extends Helper<PaymentLinkData, PaymentLink> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: PaymentLinkData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns a direct link to the payment link.
   *
   * @since 3.6.0
   */
  public getPaymentUrl(): string {
    return this.links.paymentLink.href;
  }
}
