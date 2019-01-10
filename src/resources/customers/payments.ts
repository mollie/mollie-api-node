import { get, startsWith } from 'lodash';

import CustomersBaseResource from './base';
import Payment from '../../models/Payment';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import { ICreateParams, IListParams } from '../../types/customer/payment/params';
import { CreateCallback, ListCallback } from '../../types/customer/payment/callback';
import Customer from '../../models/Customer';
import Resource from '../../resource';

/**
 * The `customers_payments` resource.
 *
 * @since 1.1.1
 */
export default class CustomersPaymentsResource extends CustomersBaseResource {
  public resource = 'customers_payments';
  public model = Payment;
  public apiName = 'Customers API (Payments section)';

  /**
   * Create a customer payment.
   *
   * @param params - Create Customer Payment parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
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
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Customer Payments
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/list-customer-payments
   * @public ✓ This method is part of the public API
   */
  public async list(
    params?: IListParams | ListCallback,
    cb?: ListCallback,
  ): Promise<List<Payment>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler(
          Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
        );
      }

      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Payment>>;
    }

    const { customerId, ...parameters } = params;
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
      );
    }

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
    throw new ApiException(`The method "get" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Payment> {
    throw new ApiException(`The method "update" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(`The method "delete" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(`The method "cancel" does not exist on the "${this.apiName}"`);
  }
}
