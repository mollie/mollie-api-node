import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Chargeback from '../../../data/chargebacks/Chargeback';
import { type ChargebackData } from '../../../data/chargebacks/Chargeback';
import type Page from '../../../data/page/Page';
import alias from '../../../plumbing/alias';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type GetParameters, type IterateParameters, type PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/chargebacks`;
}

export default class PaymentChargebacksBinder extends Binder<ChargebackData, Chargeback> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Retrieve a single chargeback by its ID. Note the original payment's ID is needed as well.
   *
   * If you do not know the original payment's ID, you can use the chargebacks list endpoint.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-payment-chargeback
   */
  public get(id: string, parameters: GetParameters): Promise<Chargeback>;
  public get(id: string, parameters: GetParameters, callback: Callback<Chargeback>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'chargeback');
    const { paymentId, ...query } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.get<ChargebackData, Chargeback>(`${getPathSegments(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve all chargebacks filed for your payments.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public page(parameters: PageParameters): Promise<Page<Chargeback>>;
  public page(parameters: PageParameters, callback: Callback<Page<Chargeback>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { paymentId, ...query } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.page<ChargebackData, Chargeback>(getPathSegments(paymentId), 'chargebacks', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all chargebacks filed for your payments.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public iterate(parameters: IterateParameters) {
    const { paymentId, valuesPerMinute, ...query } = parameters;
    assertWellFormedId(paymentId, 'payment');
    return this.networkClient.iterate<ChargebackData, Chargeback>(getPathSegments(paymentId), 'chargebacks', query, valuesPerMinute);
  }
}
