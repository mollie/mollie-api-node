import { CreateParameters, ListParameters } from './parameters';
import { PaymentData } from '../../../data/payments/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import InnerBinder from '../../InnerBinder';
import Payment from '../../../data/payments/Payment';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

function getPathSegments(customerId: string) {
  return `customers/${customerId}/payments`;
}

export default class CustomerPaymentsBinder extends InnerBinder<PaymentData, Payment> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all Payments linked to the Customer.
   *
   * @since 1.1.1
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   */
  public all: CustomerPaymentsBinder['list'] = this.list;
  /**
   * Retrieve all Payments linked to the Customer.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   */
  public page: CustomerPaymentsBinder['list'] = this.list;

  /**
   * Creates a payment for the customer.
   *
   * Linking customers to payments enables a number of [Mollie Checkout](https://www.mollie.com/en/checkout) features, including:
   *
   * -   Keeping track of payment preferences for your customers.
   * -   Enabling your customers to charge a previously used credit card with a single click.
   * -   Improved payment insights in your dashboard.
   * -   Recurring payments.
   *
   * @since 1.1.1
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
    return this.networkClient.post<PaymentData, Payment>(getPathSegments(customerId), data);
  }

  /**
   * Retrieve all Payments linked to the Customer.
   *
   * @since 3.0.0
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
    return this.networkClient.list<PaymentData, Payment>(getPathSegments(customerId), 'payments', query).then(result => this.injectPaginationHelpers(result, this.list, parameters ?? {}));
  }
}
