import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Page from '../../../data/page/Page';
import { RefundData } from '../../../data/refunds/data';
import Refund from '../../../data/refunds/Refund';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { CancelParameters, CreateParameters, GetParameters, IterateParameters, PageParameters } from './parameters';

function getPathSegments(paymentId: string) {
  return `payments/${paymentId}/refunds`;
}

export default class PaymentRefundsBinder extends Binder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Creates a refund for a specific payment. The refunded amount is credited to your customer usually either via a bank transfer or by refunding the amount to your customer's credit card.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-payment-refund
   */
  public create(parameters: CreateParameters): Promise<Refund>;
  public create(parameters: CreateParameters, callback: Callback<Refund>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { paymentId, ...data } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.post<RefundData, Refund>(getPathSegments(paymentId), data);
  }

  /**
   * Retrieve a single payment refund by its ID. Note the payment ID is required as well.
   *
   * If you do not know the original payment's ID, you can use the /reference/v2/refunds-api/list-refunds.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-payment-refund
   */
  public get(id: string, parameters: GetParameters): Promise<Refund>;
  public get(id: string, parameters: GetParameters, callback: Callback<Refund>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    const { paymentId, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.get<RefundData, Refund>(`${getPathSegments(paymentId)}/${id}`, query);
  }

  /**
   * Retrieve a list of all of your refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public page(parameters: PageParameters): Promise<Page<Refund>>;
  public page(parameters: PageParameters, callback: Callback<Page<Refund>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { paymentId, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.page<RefundData, Refund>(getPathSegments(paymentId), 'refunds', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a list of all of your refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public iterate(parameters: IterateParameters) {
    const { paymentId, valuesPerMinute, ...query } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.iterate<RefundData, Refund>(getPathSegments(paymentId), 'refunds', query, valuesPerMinute);
  }

  /**
   * For certain payment methods, like iDEAL, the underlying banking system will delay refunds until the next day. Until that time, refunds may be canceled manually in the [Mollie
   * Dashboard](https://www.mollie.com/dashboard), or programmatically by using this endpoint.
   *
   * A refund can only be canceled while its `status` field is either `queued` or `pending`. See the Get refund endpoint for more information.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-payment-refund
   */
  public cancel(id: string, parameters: CancelParameters): Promise<true>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Promise<true>>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'refund')) {
      throw new ApiError('The payments_refund id is invalid');
    }
    const { paymentId, ...context } = parameters;
    if (!checkId(paymentId, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.networkClient.delete<RefundData, true>(`${getPathSegments(paymentId)}/${id}`, context);
  }
}
