import { CreateParameters, ListParameters } from './parameters';
import { PaymentData } from '../../../data/payments/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import NetworkClient from '../../../NetworkClient';
import ParentedResource from '../../ParentedResource';
import Payment, { injectPrototypes } from '../../../data/payments/Payment';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class CustomersPaymentsResource extends ParentedResource<PaymentData, Payment> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(customerId: string): string {
    return `customers/${customerId}/payments`;
  }

  /**
   * Get all of a customer's payments.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   */
  public all: CustomersPaymentsResource['list'] = this.list;
  /**
   * Get all of a customer's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   */
  public page: CustomersPaymentsResource['list'] = this.list;

  /**
   * Create a customer payment.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
   */
  public create(parameters: CreateParameters): Promise<Payment>;
  public create(parameters: CreateParameters, callback: Callback<Payment>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.networkClient.post<Payment>(this.getResourceUrl(customerId), data);
  }

  /**
   * Get all of a customer's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   */
  public list(parameters: ListParameters): Promise<List<Payment>>;
  public list(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters ?? {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters ?? {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters ?? {};
    return this.networkClient.list(this.getResourceUrl(customerId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.list, parameters ?? {}));
  }
}
