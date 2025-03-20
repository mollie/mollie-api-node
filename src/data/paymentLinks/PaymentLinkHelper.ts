import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Helper from '../Helper';
import { type PaymentLinkData } from './data';
import type PaymentLink from './PaymentLink';
import HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import { Payment } from '../../types';
import { runIf } from 'ruply';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import { PaymentData } from '../payments/data';
import breakUrl from '../../communication/breakUrl';
import { ThrottlingParameter } from '../../types/parameters';

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

  public getPayments(parameters?: ThrottlingParameter): HelpfulIterator<Payment> {
    return (
      runIf(
        this.links.self, // TODO: Should use this.links.payments but since the API doesn't support it yet, use string which is always true
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<PaymentData, Payment>(`${pathname}/payments`, 'payments', query, parameters?.valuesPerMinute),
      ) ?? emptyHelpfulIterator
    );
    }
}
