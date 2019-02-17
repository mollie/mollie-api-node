import { defaults, get, startsWith } from 'lodash';

import Resource from '@root/resource';
import CustomersBaseResource from '@resources/customers/base';
import Payment from '@models/Payment';
import List from '@models/List';
import Customer from '@models/Customer';
import NotImplementedError from '@errors/NotImplementedError';
import { ICreateParams, IListParams } from '@mollie-types/customer/payment/params';
import { CreateCallback, ListCallback } from '@mollie-types/customer/payment/callback';

/**
 * The `customers_payments` resource.
 *
 * @since 1.1.1
 */
export default class CustomersPaymentsResource extends CustomersBaseResource {
  public static resource = 'customers_payments';
  public static model = Payment;
  public apiName = 'Customers API (Payments section)';

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
   * @since 2.2.0
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
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Payment object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Payment> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler({ detail: 'The customer id is invalid' }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.create(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Payment>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
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
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Payment>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler({ detail: 'The customer id is invalid' }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Payment>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.errorHandler({ detail: 'The customer id is invalid' });
    }
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Payment>>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(): Promise<Payment> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Payment> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
