import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Page from '../../../data/page/Page';
import { PaymentData } from '../../../data/payments/data';
import Payment from '../../../data/payments/Payment';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { IterateParameters, ListParameters } from './parameters';

export function getPathSegments(settlementId: string) {
  return `settlements/${settlementId}/payments`;
}

export default class SettlementPaymentsBinder extends Binder<PaymentData, Payment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all Payments included in a Settlement.
   *
   * Note that payments for Klarna payment methods are not listed in here. These payment methods are settled using captures. To retrieve the captures, use the List settlement captures endpoint.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-payments
   */
  public page(parameters: ListParameters): Promise<Page<Payment>>;
  public page(parameters: ListParameters, callback: Callback<Page<Payment>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { settlementId, ...query } = parameters;
    return this.networkClient.page<PaymentData, Payment>(getPathSegments(settlementId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all Payments included in a Settlement.
   *
   * Note that payments for Klarna payment methods are not listed in here. These payment methods are settled using captures. To retrieve the captures, use the List settlement captures endpoint.
   *
   * @since 3.7.0
   * @see https://docs.mollie.com/reference/v2/settlements-api/list-settlement-payments
   */
  public iterate(parameters: IterateParameters) {
    const { settlementId, valuesPerMinute, ...query } = parameters;
    return this.networkClient.iterate<PaymentData, Payment>(getPathSegments(settlementId), 'payments', query, valuesPerMinute);
  }
}
