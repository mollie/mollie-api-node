import CustomersBaseResource from './base';
import Customer from '../../models/Customer';
import List from '../../models/List';

/**
 * The `customers` resource
 *
 * @static {string} resource
 * @static {Model}  model
 * @static {string} apiName
 */
export default class CustomersResource extends CustomersBaseResource {
  public static resource = 'customers';
  public static model = Customer;
  public static apiName = 'Customers API';

  // API METHODS

  /**
   * Create a Customer.
   *
   * @param {Mollie.Customer.Params.ICreate}  params
   * @param {Mollie.Customer.Callback.Create} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Customer>}
   *
   * @since 2.0.0
   *
   * @see
   * @api
   */
  public async create(
    params: Mollie.Customer.Params.ICreate,
    cb?: Mollie.Customer.Callback.Create,
  ): Promise<Customer> {
    return super.create(params, cb) as Promise<Customer>;
  }

  /**
   * Retrieve a Customer.
   *
   * @param {string}                       id     Customer ID
   * @param {Mollie.Customer.Params.IGet}  params
   * @param {Mollie.Customer.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Customer>}
   *
   * @since 2.0.0
   *
   * @see
   * @api
   */
  public async get(
    id: string,
    params?: Mollie.Customer.Params.IGet,
    cb?: Mollie.Customer.Callback.Get,
  ): Promise<Customer> {
    return super.get(id, params, cb) as Promise<Customer>;
  }

  /**
   * List Customers.
   *
   * @param {Mollie.Customer.Params.IList}  params
   * @param {Mollie.Customer.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Customer>>}.
   *
   * @since 2.0.0
   *
   * @see
   * @api
   */
  public async list(
    params?: Mollie.Customer.Params.IList,
    cb?: Mollie.Customer.Callback.List,
  ): Promise<List<Customer>> {
    return super.list(params, cb) as Promise<List<Customer>>;
  }

  /**
   * Update a Customer.
   *
   * @param {string} id
   * @param {Mollie.Customer.Params.IUpdate}  params
   * @param {Mollie.Customer.Callback.Update} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Customer>}
   *
   * @since 2.0.0
   *
   * @see
   * @api
   */
  public async update(
    id: string,
    params: Mollie.Customer.Params.IUpdate,
    cb?: Mollie.Customer.Callback.Update,
  ): Promise<Customer> {
    return super.update(id, params, cb) as Promise<Customer>;
  }

  /**
   * Delete a Customer.
   *
   * @param {string}                          id     Customer ID
   * @param {Mollie.Customer.Params.IDelete}  params
   * @param {Mollie.Customer.Callback.Delete} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<boolean>}
   *
   * @since 2.0.0
   *
   * @see
   * @api
   */
  public async delete(
    id: string,
    params?: Mollie.Customer.Params.IDelete,
    cb?: Mollie.Customer.Callback.Delete,
  ): Promise<boolean> {
    // TODO: check return type
    return super.delete(id, params, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * List Customers.
   *
   * @since 2.0.0
   *
   * @see
   * @api
   * @alias list
   */
  all = this.list;

  /**
   * Delete a Customer.
   *
   * @since 2.0.0
   *
   * @see
   * @api
   * @alias delete
   */
  cancel = this.delete;
}
