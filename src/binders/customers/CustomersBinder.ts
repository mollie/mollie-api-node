import Customer, { CustomerData } from '../../data/customers/Customer';
import List from '../../data/list/List';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { CreateParameters, DeleteParameters, GetParameters, ListParameters, UpdateParameters } from './parameters';

const pathSegment = 'customers';

export default class CustomersBinder extends Binder<CustomerData, Customer> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve all customers created.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 2.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   */
  public all: CustomersBinder['page'] = this.page;
  /**
   * Retrieve all customers created.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   */
  public list: CustomersBinder['page'] = this.page;
  /**
   * Delete a customer. All mandates and subscriptions created for this customer will be canceled as well.
   *
   * @since 2.0.0
   * @deprecated Use `delete` instead.
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   */
  public cancel: CustomersBinder['delete'] = this.delete;

  /**
   * Creates a simple minimal representation of a customer in the Mollie API to use for the [Mollie Checkout](https://www.mollie.com/en/checkout) and Recurring features. These customers will appear in
   * your [Mollie Dashboard](https://www.mollie.com/dashboard/) where you can manage their details, and also see their payments and subscriptions.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer
   */
  public create(parameters: CreateParameters): Promise<Customer>;
  public create(parameters: CreateParameters, callback: Callback<Customer>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.networkClient.post<CustomerData, Customer>(pathSegment, parameters);
  }

  /**
   * Retrieve a single customer by its ID.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/get-customer
   */
  public get(id: string, parameters?: GetParameters): Promise<Customer>;
  public get(id: string, parameters: GetParameters, callback: Callback<Customer>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.networkClient.get<CustomerData, Customer>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all customers created.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customers
   */
  public page(parameters?: ListParameters): Promise<List<Customer>>;
  public page(parameters: ListParameters, callback: Callback<List<Customer>>): void;
  public page(parameters: ListParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.list<CustomerData, Customer>(pathSegment, 'customers', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Update an existing customer.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/update-customer
   */
  public update(id: string, parameters: UpdateParameters): Promise<Customer>;
  public update(id: string, parameters: UpdateParameters, callback: Callback<Customer>): void;
  public update(id: string, parameters: UpdateParameters) {
    if (renege(this, this.update, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.networkClient.patch<CustomerData, Customer>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Delete a customer. All mandates and subscriptions created for this customer will be canceled as well.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/customers-api/delete-customer
   */
  public delete(id: string, parameters?: DeleteParameters): Promise<true>;
  public delete(id: string, parameters: DeleteParameters, callback: Callback<true>): void;
  public delete(id: string, parameters?: DeleteParameters) {
    if (renege(this, this.delete, ...arguments)) return;
    if (!checkId(id, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    return this.networkClient.delete<CustomerData, true>(`${pathSegment}/${id}`, parameters);
  }
}
