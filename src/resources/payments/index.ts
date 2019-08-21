import { startsWith } from 'lodash';

import Payment from '../../models/Payment';
import PaymentsBaseResource from './base';

import { ICancelParams, ICreateParams, IGetParams, IListParams } from '../../types/payment/params';
import { CancelCallback, CreateCallback, GetCallback, ListCallback } from '../../types/payment/callback';
import List from '../../models/List';
import Resource from '../../resource';
import Chargeback from '../../models/Chargeback';
import NotImplementedError from '../../errors/NotImplementedError';

/**
 * The `payments` resource
 */
export default class PaymentsResource extends PaymentsBaseResource {
  public static resource = 'payments';
  public static model = Payment;
  public apiName = 'Payments API';

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   * This is just an alias of the `list` method.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   * This is just an alias of the `list` method.
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;
  /**
   * Delete the given Payment. This is just an alias of the 'cancel' method.
   *
   * Will throw an ApiError if the payment ID is invalid or if the resource cannot be found.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete = this.cancel;

  /**
   * Create a payment in Mollie.
   *
   * @param params - Create Payment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Payment>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/create-payment
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Payment> {
    return super.create(params, cb) as Promise<Payment>;
  }

  /**
   * Retrieve a single payment from Mollie.
   *
   * @param id - Payment ID
   * @param params - Retrieve Payment parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   *
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Payment> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Payment.resourcePrefix)) {
        Resource.errorHandler({ detail: 'The payment id is invalid' }, typeof params === 'function' ? params : cb);
      }

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Payment>;
    }

    if (!startsWith(id, Payment.resourcePrefix)) {
      Resource.errorHandler({ detail: 'The payment id is invalid' });
    }

    return super.get(id, params, cb) as Promise<Payment>;
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @param params - List parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payments
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Payment>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Chargeback>>;
    }

    return super.list(params);
  }

  /**
   * Cancel the given payment.
   *
   * Will throw a ApiError if the payment id is invalid or the resource cannot be found.
   * Returns with HTTP status No Content (204) if successful.
   *
   * @param id - Payment Id
   * @param params - Cancel Payment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Payment object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   *
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<Payment> {
    if (!startsWith(id, Payment.resourcePrefix)) {
      Resource.errorHandler({ detail: 'The payment id is invalid' }, typeof params === 'function' ? params : cb);
    }

    return super.delete(id, typeof params === 'function' ? params : cb) as Promise<Payment>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Payment> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
