import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import List from '../../../data/list/List';
import { PaymentData } from '../../../data/payments/data';
import Payment from '../../../data/payments/Payment';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { IterateParameters, ListParameters } from './parameters';

function getPathSegments(customerId: string, subscriptionId: string): string {
  return `customers/${customerId}/subscriptions/${subscriptionId}/payments`;
}

export default class SubscriptionPaymentsBinder extends InnerBinder<PaymentData, Payment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.3.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscription-payments
   */
  public list: SubscriptionPaymentsBinder['page'] = this.page;

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.3.0 (as `list`)
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscription-payments
   */
  public page(parameters: ListParameters): Promise<List<Payment>>;
  public page(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { subscriptionId } = parameters;
    if (!checkId(subscriptionId, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    const { customerId: _, subscriptionId: __, ...query } = parameters;
    return this.networkClient.list<PaymentData, Payment>(getPathSegments(customerId, subscriptionId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all payments of a specific subscriptions of a customer.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscription-payments
   */
  public iterate(parameters: IterateParameters) {
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { subscriptionId } = parameters;
    if (!checkId(subscriptionId, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    const { valuesPerMinute, customerId: _, subscriptionId: __, ...query } = parameters ?? {};
    return this.networkClient.iterate<PaymentData, Payment>(getPathSegments(customerId, subscriptionId), 'payments', query, valuesPerMinute);
  }
}
