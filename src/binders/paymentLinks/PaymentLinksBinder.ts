import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Page from '../../data/page/Page';
import { type PaymentLinkData } from '../../data/paymentLinks/data';
import type PaymentLink from '../../data/paymentLinks/PaymentLink';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import {
  type CreateParameters,
  type GetParameters,
  type IterateParameters,
  type PageParameters,
  PaymentParameters,
} from './parameters';
import { Payment } from '../../types';
import { PaymentData } from '../../data/payments/data';

const pathSegment = 'payment-links';

export default class PaymentsLinksBinder extends Binder<PaymentLinkData, PaymentLink> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * With the Payment links API you can generate payment links that by default, unlike regular payments, do not expire. The payment link can be shared with your customers and will redirect them to
   * them the payment page where they can complete the payment. A /reference/v2/payments-api/get-payment will only be created once the customer initiates the payment.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/payment-links-api/create-payment-link
   */
  public create(parameters: CreateParameters): Promise<PaymentLink>;
  public create(parameters: CreateParameters, callback: Callback<PaymentLink>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.networkClient.post<PaymentLinkData, PaymentLink>(pathSegment, parameters);
  }

  /**
   * Retrieve a single payment object by its payment token.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   */
  public get(id: string, parameters?: GetParameters): Promise<PaymentLink>;
  public get(id: string, parameters: GetParameters, callback: Callback<PaymentLink>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'payment-link');
    return this.networkClient.get<PaymentLinkData, PaymentLink>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all payments links created with the current website profile, ordered from newest to oldest.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/payment-links-api/list-payment-links
   */
  public page(parameters?: PageParameters): Promise<Page<PaymentLink>>;
  public page(parameters: PageParameters, callback: Callback<Page<PaymentLink>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<PaymentLinkData, PaymentLink>(pathSegment, 'payment_links', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  public payments(id: string, parameters?: PaymentParameters): Promise<Page<Payment>>;
  public payments(id: string, parameters: PaymentParameters, callback: Callback<Page<Payment>>): Promise<Page<Payment>>;
  public payments(id: string, parameters: PaymentParameters): Promise<Page<Payment>> | undefined {
    if (renege(this, this.payments, ...arguments)) return;
    return this.networkClient
      .page<PaymentData, Payment>(`${pathSegment}/${id}/payments`, 'payments', parameters)
      .then(result => this.injectPaginationHelpers(result as any, this.payments as any, parameters)) as Promise<Page<Payment>>;
  }

  /**
   * Retrieve a single payment link object by its token.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/payment-links-api/get-payment-link
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<PaymentLinkData, PaymentLink>(pathSegment, 'payment_links', query, valuesPerMinute);
  }
}
