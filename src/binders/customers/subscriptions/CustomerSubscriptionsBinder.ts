import List from '../../../data/list/List';
import { SubscriptionData } from '../../../data/subscription/data';
import Subscription from '../../../data/subscription/Subscription';
import ApiError from '../../../errors/ApiError';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';
import TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Callback from '../../../types/Callback';
import InnerBinder from '../../InnerBinder';
import { CancelParameters, CreateParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';

function getPathSegments(customerId: string) {
  return `customers/${customerId}/subscriptions`;
}

export default class CustomerSubscriptionsBinder extends InnerBinder<SubscriptionData, Subscription> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * A subscription can be canceled any time by calling `DELETE` on the resource endpoint.
   *
   * @since 1.3.2
   * @deprecated Use `cancel` instead.
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   */
  public delete: CustomerSubscriptionsBinder['cancel'] = this.cancel;
  /**
   * Retrieve all subscriptions of a customer.
   *
   * @since 1.3.2
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   */
  public all: CustomerSubscriptionsBinder['page'] = this.page;
  /**
   * Retrieve all subscriptions of a customer.
   *
   * @since 3.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   */
  public list: CustomerSubscriptionsBinder['page'] = this.page;

  /**
   * With subscriptions, you can schedule recurring payments to take place at regular intervals.
   *
   * For example, by simply specifying an `amount` and an `interval`, you can create an endless subscription to charge a monthly fee, until you cancel the subscription.
   *
   * Or, you could use the `times` parameter to only charge a limited number of times, for example to split a big transaction in multiple parts.
   *
   * A few example usages:
   *
   * -   `amount[currency]="EUR" amount[value]="5.00" interval="2 weeks"` Your consumer will be charged €5 once every two weeks.
   * -   `amount[currency]="EUR" amount[value]="20.00" interval="1 day" times=5` Your consumer will be charged €20 every day, for five consecutive days.
   * -   `amount[currency]="EUR" amount[value]="10.00" interval="1 month" startDate="2018-04-30"` Your consumer will be charged €10 on the last day of each month, starting in April 2018.
   *
   * @since 1.3.2
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
   */
  public create(parameters: CreateParameters): Promise<Subscription>;
  public create(parameters: CreateParameters, callback: Callback<Subscription>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.networkClient.post<SubscriptionData, Subscription>(getPathSegments(customerId), data);
  }

  /**
   * Retrieve a subscription by its ID and its customer's ID.
   *
   * @since 1.3.2
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
   */
  public get(id: string, parameters: GetParameters): Promise<Subscription>;
  public get(id: string, parameters: GetParameters, callback: Callback<Subscription>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters ?? {};
    return this.networkClient.get<SubscriptionData, Subscription>(`${getPathSegments(customerId)}/${id}`, query);
  }

  /**
   * Retrieve all subscriptions of a customer.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   */
  public page(parameters: ListParameters): Promise<List<Subscription>>;
  public page(parameters: ListParameters, callback: Callback<List<Subscription>>): void;
  public page(parameters: ListParameters) {
    if (renege(this, this.page, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters ?? {};
    return this.networkClient
      .list<SubscriptionData, Subscription>(getPathSegments(customerId), 'subscriptions', query)
      .then(result => this.injectPaginationHelpers(result, this.page, parameters ?? {}));
  }

  /**
   * Some fields of a subscription can be updated by calling `PATCH` on the resource endpoint. Each field is optional.
   *
   * You cannot update a canceled subscription.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
   */
  public update(id: string, parameters: UpdateParameters): Promise<Subscription>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Subscription>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.networkClient.patch<SubscriptionData, Subscription>(`${getPathSegments(customerId)}/${id}`, data);
  }

  /**
   * A subscription can be canceled any time by calling `DELETE` on the resource endpoint.
   *
   * @since 1.3.2
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   */
  public cancel(id: string, parameters: CancelParameters): Promise<Subscription>;
  public cancel(id: string, parameters: CancelParameters, callback: Callback<Subscription>): void;
  public cancel(id: string, parameters: CancelParameters) {
    if (renege(this, this.cancel, ...arguments)) return;
    if (!checkId(id, 'subscription')) {
      throw new ApiError('The subscription id is invalid');
    }
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...context } = parameters ?? {};
    return this.networkClient.delete<SubscriptionData, Subscription>(`${getPathSegments(customerId)}/${id}`, context);
  }
}
