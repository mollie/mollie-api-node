import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import { type PaymentData } from '../../../data/payments/data';
import type Payment from '../../../data/payments/Payment';
import alias from '../../../plumbing/alias';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

function getPathSegments(customerId: string, subscriptionId: string): string {
  return `customers/${customerId}/subscriptions/${subscriptionId}/payments`;
}

export default class SubscriptionPaymentsBinder extends Binder<PaymentData, Payment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: 'list' });
  }

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.3.0 (as `list`)
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscription-payments
   */
  public page(parameters: PageParameters): Promise<Page<Payment>>;
  public page(parameters: PageParameters, callback: Callback<Page<Payment>>): void;
  public page(parameters: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const { customerId, subscriptionId, ...query } = parameters;
    assertWellFormedId(customerId, 'customer');
    assertWellFormedId(subscriptionId, 'subscription');
    return this.networkClient.page<PaymentData, Payment>(getPathSegments(customerId, subscriptionId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscription-payments
   */
  public iterate(parameters: IterateParameters) {
    const { customerId, subscriptionId, valuesPerMinute, ...query } = parameters;
    assertWellFormedId(customerId, 'customer');
    assertWellFormedId(subscriptionId, 'subscription');
    return this.networkClient.iterate<PaymentData, Payment>(getPathSegments(customerId, subscriptionId), 'payments', query, valuesPerMinute);
  }
}
