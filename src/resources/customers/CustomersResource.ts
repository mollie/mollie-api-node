import List from '../../data/list/List';
import Customer, { CustomerData, injectPrototypes } from '../../data/customers/Customer';
import Resource from '../Resource';
import { CreateParameters, ContextParameters, ListParameters, UpdateParameters } from './parameters';
import checkId from '../../plumbing/checkId';
import ApiError from '../../errors/ApiError';

/**
 * The `Customers` resource
 */
export default class CustomersResource extends Resource<CustomerData, Customer> {
  protected getResourceUrl(): string {
    return 'customers';
  }

  protected injectPrototypes = injectPrototypes;

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
  public create(parameters: CreateParameters): Promise<Customer> {
    return this.network.post(this.getResourceUrl(), parameters);
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
  public get(id: string, parameters?: ContextParameters): Promise<Customer> {
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
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
  public async list(parameters: ListParameters = {}): Promise<List<Customer>> {
    const result = await this.network.list(this.getResourceUrl(), 'customers', parameters);
    return this.injectPaginationHelpers(result, this.list, parameters);
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
  public update(id: string, parameters: UpdateParameters): Promise<Customer> {
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.patch(`${this.getResourceUrl()}/${id}`, parameters);
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
  public delete(id: string, parameters?: ContextParameters): Promise<true> {
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.delete(`${this.getResourceUrl()}/${id}`) as Promise<true>;
  }
}
