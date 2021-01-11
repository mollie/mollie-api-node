import { GetParameters, ListParameters } from './parameters';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import Chargeback, { ChargebackData, injectPrototypes } from '../../../data/chargebacks/Chargeback';
import List from '../../../data/list/List';
import NetworkClient from '../../../NetworkClient';
import ParentedResource from '../../ParentedResource';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class PaymentsChargebacksResource extends ParentedResource<ChargebackData, Chargeback> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(paymentId: string): string {
    return `payments/${paymentId}/chargebacks`;
  }

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public all: PaymentsChargebacksResource['list'] = this.list;
  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public page: PaymentsChargebacksResource['list'] = this.list;

  /**
   * Get a Payment Chargeback by ID
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
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
    return this.networkClient.get(`${this.getResourceUrl(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public list(parameters: ListParameters): Promise<List<Chargeback>>;
  public list(parameters: ListParameters, callback: Callback<List<Chargeback>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.networkClient.list(this.getResourceUrl(paymentId), 'chargebacks', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
