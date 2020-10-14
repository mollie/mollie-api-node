import { CancelParameters, CreateParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';
import { PaymentData } from '../../data/payments/data';
import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Payment, { injectPrototypes } from '../../data/payments/Payment';
import Resource from '../Resource';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';

export default class PaymentsResource extends Resource<PaymentData, Payment> {
  protected getResourceUrl(): string {
    return 'payments';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   * This is just an alias of the `list` method.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   */
  public all: PaymentsResource['list'] = this.list;
  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   * This is just an alias of the `list` method.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   */
  public page: PaymentsResource['list'] = this.list;
  /**
   * Delete the given Payment. This is just an alias of the 'cancel' method.
   *
   * Will throw an ApiError if the payment ID is invalid or if the resource cannot be found.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   */
  public delete: PaymentsResource['cancel'] = this.cancel;

  /**
   * Create a payment in Mollie.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/create-payment
   */
  public create(parameters: CreateParameters): Promise<Payment>;
  public create(parameters: CreateParameters, callback: Callback<Payment>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { include, ...data } = parameters;
    const query = include != undefined ? { include } : undefined;
    return this.network.post(this.getResourceUrl(), data, query);
  }

  /**
   * Retrieve a single payment from Mollie.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   */
  public get(id: string, parameters?: GetParameters): Promise<Payment>;
  public get(id: string, parameters: GetParameters, callback: Callback<Payment>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   */
  public list(parameters?: ListParameters): Promise<List<Payment>>;
  public list(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'payments', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * Update some details of a created payment.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/update-payment
   */
  public update(id: string, parameters: UpdateParameters): Promise<Payment>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Payment>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.network.patch(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Cancel the given payment.
   *
   * Will throw an ApiError if the payment id is invalid or the resource cannot be found.
   * Returns with HTTP status No Content (204) if successful.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   */
  public cancel(id: string, parameters?: CancelParameters): Promise<Payment>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<List<Payment>>): void;
  public cancel(id: string, parameters?: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'payment')) {
      throw new ApiError('The payment id is invalid');
    }
    return this.network.delete<Payment>(`${this.getResourceUrl()}/${id}`, parameters);
  }
}
