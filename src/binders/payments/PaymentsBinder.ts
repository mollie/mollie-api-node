import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Page from '../../data/page/Page';
import { type PaymentData } from '../../data/payments/data';
import type Payment from '../../data/payments/Payment';
import alias from '../../plumbing/alias';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type CancelParameters, type CreateParameters, type GetParameters, type IterateParameters, type PageParameters, type UpdateParameters } from './parameters';

const pathSegment = 'payments';

export default class PaymentsBinder extends Binder<PaymentData, Payment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'], cancel: 'delete' });
  }

  /**
   * Payment creation is elemental to the Mollie API: this is where most payment implementations start off.
   *
   * Once you have created a payment, you should redirect your customer to the URL in the `_links.checkout` property from the response.
   *
   * To wrap your head around the payment process, an explanation and flow charts can be found in the Accepting payments guide.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/payments-api/create-payment
   */
  public create(parameters: CreateParameters): Promise<Payment>;
  public create(parameters: CreateParameters, callback: Callback<Payment>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { include, ...data } = parameters;
    const query = runIf(include, include => ({ include }));
    return this.networkClient.post<PaymentData, Payment>(pathSegment, data, query);
  }

  /**
   * Retrieve a single payment object by its payment token.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   */
  public get(id: string, parameters?: GetParameters): Promise<Payment>;
  public get(id: string, parameters: GetParameters, callback: Callback<Payment>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'payment');
    return this.networkClient.get<PaymentData, Payment>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   */
  public page(parameters?: PageParameters): Promise<Page<Payment>>;
  public page(parameters: PageParameters, callback: Callback<Page<Payment>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<PaymentData, Payment>(pathSegment, 'payments', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<PaymentData, Payment>(pathSegment, 'payments', query, valuesPerMinute);
  }

  /**
   * This endpoint can be used to update some details of a created payment.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/payments-api/update-payment
   */
  public update(id: string, parameters: UpdateParameters): Promise<Payment>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Payment>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    assertWellFormedId(id, 'payment');
    return this.networkClient.patch<PaymentData, Payment>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Some payment methods can be canceled by the merchant for a certain amount of time, usually until the next business day. Or as long as the payment status is `open`. Payments may be canceled
   * manually from the Mollie Dashboard, or programmatically by using this endpoint.
   *
   * The `isCancelable` property on the Payment object will indicate if the payment can be canceled.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   */
  public cancel(id: string, parameters?: CancelParameters): Promise<Payment>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Page<Payment>>): void;
  public cancel(id: string, parameters?: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    assertWellFormedId(id, 'payment');
    return this.networkClient.delete<PaymentData, Payment>(`${pathSegment}/${id}`, parameters);
  }
}
