import CustomersBaseResource from './base';
import Payment from '../../models/Payment';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import { ICreateParams, IListParams } from '../../types/customer/payment/params';
import { CreateCallback, ListCallback } from '../../types/customer/payment/callback';

/**
 * The `customers_payments` resource.
 *
 * @static {string} resource
 * @static {Object} model
 * @static {string} apiName
 *
 * @since 1.1.1
 */
export default class CustomersPaymentsResource extends CustomersBaseResource {
  public static resource = 'customers_payments';
  public static model = Payment;
  public static apiName = 'Customers API (Payments section)';

  /**
   * Create a customer payment.
   *
   * @param params - Create Customer Payment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Payment object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Payment> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Payment>;
  }

  /**
   * Get all of a customer's payments.
   *
   * @param params - List Customer Payments parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Customer Payments
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Payment>> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Payment>>;
  }

  // ALIASES

  /**
   * Get all of a customer's payments.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   * @public ✓ This method is part of the public API
   */
  all = this.list;

  /**
   * @deprecated This method is not available
   */
  public async get(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.get.name}" does not exist on the "${CustomersPaymentsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${
        CustomersPaymentsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${
        CustomersPaymentsResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${
        CustomersPaymentsResource.apiName
      }"`,
    );
  }
}
