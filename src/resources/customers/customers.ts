import CustomersBaseResource from './base';
import Customer from '../../models/Customer';
import List from '../../models/List';
import {
  ICreateParams,
  IGetParams,
  IListParams,
  IUpdateParams,
  IDeleteParams,
} from '../../types/customer/params';
import {
  CreateCallback,
  GetCallback,
  ListCallback,
  UpdateCallback,
  DeleteCallback,
} from '../../types/customer/callback';

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
   * Creates a simple minimal representation of a customer in the Mollie API
   * to use for the {@link https://www.mollie.com/en/checkout Mollie Checkout}
   * and Recurring features.
   * These customers will appear in your
   * {@link https://www.mollie.com/dashboard/ Mollie Dashboard}
   * where you can manage their details,
   * and also see their payments and subscriptions.
   *
   * @param {ICreateParams}  params Create Customer parameters
   * @param {CreateCallback} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Customer>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Customer> {
    return super.create(params, cb) as Promise<Customer>;
  }

  /**
   * Retrieve a single customer by its ID.
   *
   * @param id - Customer ID
   * @param params - Retrieve Customer parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Customer> {
    return super.get(id, params, cb) as Promise<Customer>;
  }

  /**
   * List Customers.
   *
   * @param params - List Customers parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Customer>> {
    return super.list(params, cb) as Promise<List<Customer>>;
  }

  /**
   * Update a Customer.
   *
   * @param id - Customer ID
   * @param params - Update Customer parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Customer object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/update-customer
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams, cb?: UpdateCallback): Promise<Customer> {
    return super.update(id, params, cb) as Promise<Customer>;
  }

  /**
   * Delete a Customer.
   *
   * @param id - Customer ID
   * @param params - Delete Customer parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   * @public ✓ This method is part of the public API
   */
  public async delete(id: string, params?: IDeleteParams, cb?: DeleteCallback): Promise<boolean> {
    // TODO: check return type
    return super.delete(id, params, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * List Customers.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   * @public ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;

  /**
   * Delete a Customer.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   * @public ✓ This method is part of the public API
   * @alias delete
   */
  cancel = this.delete;
}
