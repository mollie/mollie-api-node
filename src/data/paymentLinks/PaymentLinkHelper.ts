import { runIf } from 'ruply';
import breakUrl from '../../communication/breakUrl';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import emptyHelpfulIterator from '../../plumbing/iteration/emptyHelpfulIterator';
import type HelpfulIterator from '../../plumbing/iteration/HelpfulIterator';
import type { Payment } from '../../types';
import type { ThrottlingParameter } from '../../types/parameters';
import Helper from '../Helper';
import type { PaymentData } from '../payments/data';
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

  public getPayments(parameters?: ThrottlingParameter): HelpfulIterator<Payment> {
    return (
      runIf(
        /**
         * TODO: Should use this.links.payments but since the API doesn't support it yet, use string which is always true
         * For issue tracking see https://github.com/mollie/mollie-api-node/issues/417
         */
        this.links.self,
        ({ href }) => breakUrl(href),
        ([pathname, query]) => this.networkClient.iterate<PaymentData, Payment>(`${pathname}/payments`, 'payments', query, parameters?.valuesPerMinute),
      ) ?? emptyHelpfulIterator
    );
    }
}
