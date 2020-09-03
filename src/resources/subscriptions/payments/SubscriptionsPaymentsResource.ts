import { ListParameters } from './parameters';
import { PaymentData } from '../../../data/payments/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import ParentedResource from '../../ParentedResource';
import Payment, { injectPrototypes } from '../../../data/payments/Payment';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class SubscriptionsPaymentsResource extends ParentedResource<PaymentData, Payment> {
  protected getResourceUrl(customerId: string, subscriptionId: string): string {
    return `customers/${customerId}/subscriptions/${subscriptionId}/payments`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Get all of a subscription's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   */
  public all: SubscriptionsPaymentsResource['list'] = this.list;
  /**
   * Get all of a subscription's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   */
  public page: SubscriptionsPaymentsResource['list'] = this.list;

  /**
   * Get all of a subscription's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   */
  public list(parameters: ListParameters): Promise<List<Payment>>;
  public list(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const incomingParams = parameters || {};
    const customerId = this.getParentId(incomingParams.customerId);
    const subscriptionId = this.getParentId(incomingParams.subscriptionId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }

    if (!checkId(subscriptionId, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }

    const { customerId: _, subscriptionId: __, ...query } = incomingParams;
    return this.network.list(this.getResourceUrl(customerId, subscriptionId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.list, incomingParams));
  }
}
