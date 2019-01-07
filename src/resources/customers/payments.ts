import CustomersBaseResource from './base';
import Payment from '../../models/Payment';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';

/**
 * The `customers_payments` resource
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
   * Create a customer payment
   *
   * @param {Mollie.CustomerPayment.Params.ICreate}  params
   * @param {Mollie.CustomerPayment.Callback.Create} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see
   * @api
   */
  public async create(
    params: Mollie.CustomerPayment.Params.ICreate,
    cb?: Mollie.CustomerPayment.Callback.Create,
  ): Promise<Payment> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Payment>;
  }

  /**
   * Get all of a customer's payments
   *
   * @param {Mollie.CustomerPayment.Params.IList}  params
   * @param {Mollie.CustomerPayment.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Payment>>}
   *
   * @since 2.2.0
   *
   * @see
   * @api
   */
  public async list(
    params?: Mollie.CustomerPayment.Params.IList,
    cb?: Mollie.CustomerPayment.Callback.List,
  ): Promise<List<Payment>> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Payment>>;
  }

  // ALIASES

  /**
   * Get all of a customer's payments
   *
   * @since 1.1.1
   *
   * @see
   * @api
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
