import { CancelParameters, CreateParameters, GetParameters, ListParameters } from './parameters';
import { RefundData } from '../../../data/refunds/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import NetworkClient from '../../../NetworkClient';
import InnerBinder from '../../InnerBinder';
import Refund, { injectPrototypes } from '../../../data/refunds/Refund';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class PaymentsRefundsBinder extends InnerBinder<RefundData, Refund> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(paymentId: string): string {
    return `payments/${paymentId}/refunds`;
  }

  /**
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public all: PaymentsRefundsBinder['list'] = this.list;
  /**
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public page: PaymentsRefundsBinder['list'] = this.list;
  /**
   * For certain payment methods, like iDEAL, the underlying banking system will delay refunds until the next day. Until that time, refunds may be canceled manually in the [Mollie
   * Dashboard](https://www.mollie.com/dashboard), or programmatically by using this endpoint.
   *
   * A Refund can only be canceled while its `status` field is either `queued` or `pending`. See the /reference/v2/refunds-api/get-refund for more information.
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   */
  public delete: PaymentsRefundsBinder['cancel'] = this.cancel;

  /**
   * Creates a Refund on the Payment. The refunded amount is credited to your customer.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-refund
   */
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const paymentId = this.getParentId(parameters.paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...data } = parameters;
    return this.networkClient.post(this.getResourceUrl(paymentId), data);
  }

  /**
   * Retrieve a single Refund by its ID. Note the Payment's ID is needed as well.
   *
   * If you do not know the original payment's ID, you can use the /reference/v2/refunds-api/list-refunds.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
   */
  public get(id: string, parameters: GetParameters): Promise<Refund>;
  public get(id: string, parameters: GetParameters, callback: Callback<Refund>): void;
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
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public list(parameters: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.networkClient.list(this.getResourceUrl(paymentId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * For certain payment methods, like iDEAL, the underlying banking system will delay refunds until the next day. Until that time, refunds may be canceled manually in the [Mollie
   * Dashboard](https://www.mollie.com/dashboard), or programmatically by using this endpoint.
   *
   * A Refund can only be canceled while its `status` field is either `queued` or `pending`. See the /reference/v2/refunds-api/get-refund for more information.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   */
  public cancel(id: string, parameters: CancelParameters): Promise<true>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Promise<true>>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...context } = parameters;
    return this.networkClient.delete<true>(`${this.getResourceUrl(paymentId)}/${id}`, context);
  }
}
