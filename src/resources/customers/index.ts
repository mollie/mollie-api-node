import { startsWith } from 'lodash';

import Resource from '../../resource';
import CustomersBaseResource from '../../resources/customers/base';
import Customer from '../../models/Customer';
import List from '../../models/List';
import { ICreateParams, IDeleteParams, IGetParams, IListParams, IUpdateParams } from '../../types/customer/params';
import { CreateCallback, DeleteCallback, GetCallback, ListCallback, UpdateCallback } from '../../types/customer/callback';

/**
 * The `Customers` resource
 */
export default class CustomersResource extends CustomersBaseResource {
  public static resource = 'customers';
  public static model = Customer;
  public apiName = 'Customers API';

  /**
   * List Customers.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * List Customers.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;
  /**
   * Delete a Customer.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   *
   * @public ✓ This method is part of the public API
   *
   * @alias delete
   */
  public cancel = this.delete;

  /**
   * Creates a simple minimal representation of a customer in the Mollie API
   * to use for the {@link https://www.mollie.com/en/checkout Mollie Checkout}
   * and Recurring features.
   * These customers will appear in your
   * {@link https://www.mollie.com/dashboard/ Mollie Dashboard}
   * where you can manage their details,
   * and also see their payments and subscriptions.
   *
   * @param params - Create customer parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created customer object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Customer> {
    return super.create(params, cb) as Promise<Customer>;
  }

  /**
   * Retrieve a single customer by its ID
   *
   * @param id - Customer ID
   * @param params - Retrieve customer parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Customer object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
   *
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Customer> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Customer>;
    }

    if (!startsWith(id, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid');
    }
    return super.get(id, params, cb) as Promise<Customer>;
  }

  /**
   * List customers
   *
   * @param params - List customer parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Customer>> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Customer>>;
    }

    return super.list(params, cb) as Promise<List<Customer>>;
  }

  /**
   * Update a customer
   *
   * @param id - Customer ID
   * @param params - Update customer parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Customer object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/update-customer
   *
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams | UpdateCallback, cb?: UpdateCallback): Promise<Customer> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }

      return super.update(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Customer>;
    }

    if (!startsWith(id, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid');
    }
    return super.update(id, params, cb) as Promise<Customer>;
  }

  /**
   * Delete a customer
   *
   * @param id - Customer ID
   * @param params - Delete customer parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   *
   * @public ✓ This method is part of the public API
   */
  public async delete(id: string, params?: IDeleteParams | DeleteCallback, cb?: DeleteCallback): Promise<boolean> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }

      return super.delete(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<boolean>;
    }

    if (!startsWith(id, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid');
    }

    return !!(await super.delete(id, params, cb));
  }
}
