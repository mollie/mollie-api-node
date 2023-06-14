import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Chargeback, { ChargebackData } from '../../../data/chargebacks/Chargeback';
import Page from '../../../data/page/Page';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { GetParameters, IterateParameters, PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/chargebacks`;
}

export default class PaymentChargebacksBinder extends InnerBinder<ChargebackData, Chargeback> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
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
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
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
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
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
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { valuesPerMinute, paymentId: _, ...query } = parameters ?? {};
    return this.networkClient.iterate<ChargebackData, Chargeback>(getPathSegments(paymentId), 'chargebacks', query, valuesPerMinute);
  }
}
