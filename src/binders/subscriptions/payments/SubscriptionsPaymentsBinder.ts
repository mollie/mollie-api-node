import { ListParameters } from './parameters';
import { PaymentData } from '../../../data/payments/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import NetworkClient from '../../../NetworkClient';
import InnerBinder from '../../InnerBinder';
import Payment, { injectPrototypes } from '../../../data/payments/Payment';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class SubscriptionsPaymentsBinder extends InnerBinder<PaymentData, Payment> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(customerId: string, subscriptionId: string): string {
    return `customers/${customerId}/subscriptions/${subscriptionId}/payments`;
  }

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.3.0
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
    return this.networkClient.list(this.getResourceUrl(customerId, subscriptionId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
