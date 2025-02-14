import breakUrl from '../../communication/breakUrl';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import { type Capture } from '../../types';
import { type ThrottlingParameter } from '../../types/parameters';
import type Chargeback from '../chargebacks/Chargeback';
import { type ChargebackData } from '../chargebacks/Chargeback';
import Helper from '../Helper';
import { type CaptureData } from '../payments/captures/data';
import { type PaymentData } from '../payments/data';
import type Payment from '../payments/Payment';
import { type RefundData } from '../refunds/data';
import type Refund from '../refunds/Refund';
import { type SettlementData } from './data';
import type SettlementModel from './SettlementModel';

export default class SettlementHelper extends Helper<SettlementData, SettlementModel> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: SettlementData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the payments that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getPayments(parameters?: ThrottlingParameter) {
    const [pathname, query] = breakUrl(this.links.payments.href);
    return this.networkClient.iterate<PaymentData, Payment>(pathname, 'payments', query, parameters?.valuesPerMinute);
  }

  /**
   * Returns the refunds that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getRefunds(parameters?: ThrottlingParameter) {
    const [pathname, query] = breakUrl(this.links.refunds.href);
    return this.networkClient.iterate<RefundData, Refund>(pathname, 'refunds', query, parameters?.valuesPerMinute);
  }

  /**
   * Returns the chargebacks that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getChargebacks(parameters?: ThrottlingParameter) {
    const [pathname, query] = breakUrl(this.links.chargebacks.href);
    return this.networkClient.iterate<ChargebackData, Chargeback>(pathname, 'chargebacks', query, parameters?.valuesPerMinute);
  }

  /**
   * Returns the captures that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getCaptures(parameters?: ThrottlingParameter) {
    const [pathname, query] = breakUrl(this.links.captures.href);
    return this.networkClient.iterate<CaptureData, Capture>(pathname, 'captures', query, parameters?.valuesPerMinute);
  }
}
