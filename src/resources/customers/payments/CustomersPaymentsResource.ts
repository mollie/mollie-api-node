import ParentedResource from '../../ParentedResource';
import { PaymentData } from '../../../data/payments/data';
import Payment, { injectPrototypes } from '../../../data/payments/Payment';
import { CreateParameters, ListParameters } from './parameters';
import checkId from '../../../plumbing/checkId';
import ApiError from '../../../errors/ApiError';
import List from '../../../data/list/List';
import renege from '../../../plumbing/renege';
import Callback from '../../../types/Callback';

/**
 * The `customers_payments` resource.
 *
 * @since 1.1.1
 */
export default class CustomersPaymentsResource extends ParentedResource<PaymentData, Payment> {
  protected getResourceUrl(customerId: string): string {
    return `customers/${customerId}/payments`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Get all of a customer's payments.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * Get all of a customer's payments.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;

  /**
   * Create a customer payment.
   *
   * @param params - Create Customer Payment parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Payment object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
   *
   * @public ✓ This method is part of the public API
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
    return this.network.post(this.getResourceUrl(customerId!), data);
  }

  /**
   * Get all of a customer's payments.
   *
   * @param params - List Customer Payments parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Customer Payments
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Payment>>;
  public list(parameters: ListParameters, callback: Callback<List<Payment>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.list(this.getResourceUrl(customerId!), 'payments', query)
    .then(result => this.injectPaginationHelpers(result, this.list, parameters || {}));
  }
}
