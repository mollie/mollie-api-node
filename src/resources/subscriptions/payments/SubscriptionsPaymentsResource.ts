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
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.3.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions-payments
   */
  public list(parameters: ListParameters): Promise<List<Payment>>;
  public list(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { subscriptionId } = parameters;
    if (!checkId(subscriptionId, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    const { customerId: _, subscriptionId: __, ...query } = parameters;
    return this.network.list(this.getResourceUrl(customerId, subscriptionId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
