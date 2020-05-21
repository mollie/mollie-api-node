import { CreateParameters, DeleteParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';
import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import Customer, { CustomerData, injectPrototypes } from '../../data/customers/Customer';
import List from '../../data/list/List';
import Resource from '../Resource';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';

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
   */
  public all: CustomersResource['list'] = this.list;
  /**
   * List Customers.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   */
  public page: CustomersResource['list'] = this.list;
  /**
   * Delete a Customer.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   */
  public cancel: CustomersResource['delete'] = this.delete;

  /**
   * Creates a simple minimal representation of a customer in the Mollie API
   * to use for the {@link https://www.mollie.com/en/checkout Mollie Checkout}
   * and Recurring features.
   * These customers will appear in your
   * {@link https://www.mollie.com/dashboard/ Mollie Dashboard}
   * where you can manage their details,
   * and also see their payments and subscriptions.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer
   */
  public create(parameters: CreateParameters): Promise<Customer>;
  public create(parameters: CreateParameters, callback: Callback<Customer>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.network.post(this.getResourceUrl(), parameters);
  }

  /**
   * Retrieve a single customer by its ID
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
   */
  public get(id: string, parameters?: GetParameters): Promise<Customer>;
  public get(id: string, parameters: GetParameters, callback: Callback<Customer>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * List customers
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   */
  public list(parameters?: ListParameters): Promise<List<Customer>>;
  public list(parameters: ListParameters, callback: Callback<List<Customer>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'customers', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }

  /**
   * Update a customer
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/update-customer
   */
  public update(id: string, parameters: UpdateParameters): Promise<Customer>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Customer>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.patch(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Delete a customer
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   */
  public delete(id: string, parameters?: DeleteParameters): Promise<true>;
  public delete(id: string, parameters: DeleteParameters, callback: Callback<true>): void;
  public delete(id: string, parameters?: DeleteParameters) {
    if (renege(this, this.delete, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.network.delete<true>(`${this.getResourceUrl()}/${id}`, parameters);
  }
}
