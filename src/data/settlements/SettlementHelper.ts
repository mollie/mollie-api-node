import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import { Capture } from '../../types';
import { ThrottlingParameter } from '../../types/parameters';
import Chargeback, { ChargebackData } from '../chargebacks/Chargeback';
import Helper from '../Helper';
import { CaptureData } from '../payments/captures/data';
import { PaymentData } from '../payments/data';
import Payment from '../payments/Payment';
import { RefundData } from '../refunds/data';
import Refund from '../refunds/Refund';
import { SettlementData } from './data';
import SettlementModel from './SettlementModel';

export default class SettlementHelper extends Helper<SettlementData, SettlementModel> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: SettlementData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the payments that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getPayments(parameters?: ThrottlingParameter) {
    return this.networkClient.iterate<PaymentData, Payment>(this.links.payments.href, 'payments', undefined, parameters?.valuesPerMinute);
  }

  /**
   * Returns the refunds that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getRefunds(parameters?: ThrottlingParameter) {
    return this.networkClient.iterate<RefundData, Refund>(this.links.refunds.href, 'refunds', undefined, parameters?.valuesPerMinute);
  }

  /**
   * Returns the chargebacks that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getChargebacks(parameters?: ThrottlingParameter) {
    return this.networkClient.iterate<ChargebackData, Chargeback>(this.links.chargebacks.href, 'chargebacks', undefined, parameters?.valuesPerMinute);
  }

  /**
   * Returns the captures that are included in this settlement.
   *
   * @since 3.7.0
   */
  public getCaptures(parameters?: ThrottlingParameter) {
    return this.networkClient.iterate<CaptureData, Capture>(this.links.captures.href, 'captures', undefined, parameters?.valuesPerMinute);
  }
}
