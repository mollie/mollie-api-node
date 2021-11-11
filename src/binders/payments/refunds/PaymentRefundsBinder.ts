import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import List from '../../../data/list/List';
import { RefundData } from '../../../data/refunds/data';
import Refund from '../../../data/refunds/Refund';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import HelpfulIterator from '../../../plumbing/HelpfulIterator';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { CancelParameters, CreateParameters, GetParameters, ListParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/refunds`;
}

export default class PaymentRefundsBinder extends InnerBinder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
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
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public all: PaymentRefundsBinder['page'] = this.page;
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
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public list: PaymentRefundsBinder['page'] = this.page;
  /**
   * For certain payment methods, like iDEAL, the underlying banking system will delay refunds until the next day. Until that time, refunds may be canceled manually in the [Mollie
   * Dashboard](https://www.mollie.com/dashboard), or programmatically by using this endpoint.
   *
   * A Refund can only be canceled while its `status` field is either `queued` or `pending`. See the /reference/v2/refunds-api/get-refund for more information.
   *
   * @deprecated Use `cancel` instead.
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   */
  public delete: PaymentRefundsBinder['cancel'] = this.cancel;

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
    return this.networkClient.post<RefundData, Refund>(getPathSegments(paymentId), data);
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
    return this.networkClient.get<RefundData, Refund>(`${getPathSegments(paymentId)}/${id}`, query);
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
  public page(parameters: ListParameters): Promise<List<Refund>>;
  public page(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.networkClient.list<RefundData, Refund>(getPathSegments(paymentId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
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
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public iterate(parameters: Omit<ListParameters, 'limit'>): HelpfulIterator<Refund> {
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const paymentId = this.getParentId((parameters ?? {}).paymentId);
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    const { paymentId: _, ...query } = parameters;
    return this.networkClient.iterate<RefundData, Refund>(getPathSegments(paymentId), 'refunds', { ...query, limit: 64 });
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
    return this.networkClient.delete<RefundData, true>(`${getPathSegments(paymentId)}/${id}`, context);
  }
}
