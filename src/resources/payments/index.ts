import { startsWith } from 'lodash';

import Payment from '../../models/Payment';
import PaymentsBaseResource from '../../resources/payments/base';

import ApiException from '../../exceptions/ApiException';
import { ICancelParams, ICreateParams, IGetParams, IListParams } from '../../types/payment/params';
import {
  CancelCallback,
  CreateCallback,
  GetCallback,
  ListCallback,
} from '../..//types/payment/callback';
import List from '../../models/List';
import Resource from '../../resource';

/**
 * The `payments` resource
 */
export default class PaymentsResource extends PaymentsBaseResource {
  public resource = 'payments';
  public model = Payment;
  public apiName = 'Payments API';

  // API METHODS

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
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Payment> {
    const callback = typeof params === 'function' ? params : cb;

    if (!startsWith(id, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } }, callback);
    }

    return super.get(id, params, callback) as Promise<Payment>;
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @param params - List parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payments
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Payment>> {
    return super.list(params, cb);
  }

  /**
   * Cancel the given payment.
   *
   * Will throw a ApiException if the payment id is invalid or the resource cannot be found.
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
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<Payment> {
    const callback = typeof params === 'function' ? params : cb;
    if (!startsWith(id, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } }, callback);
    }

    return super.delete(id, callback) as Promise<Payment>;
  }

  // ALIASES
  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   * This is just an alias of the `list` method.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   * @public ✓ This method is part of the public API
   * @alias list
   */

  all = this.list;
  /**
   * Delete the given Payment. This is just an alias of the 'cancel' method.
   *
   * Will throw an ApiException if the payment ID is invalid or if the resource cannot be found.
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   * @public ✓ This method is part of the public API
   * @alias cancel
   */
  delete = this.cancel;

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Payment> {
    throw new ApiException(`The method "update" does not exist on the "${this.apiName}"`);
  }
}
