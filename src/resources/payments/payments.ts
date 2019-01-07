import { startsWith } from 'lodash';

import Payment from '../../models/Payment';
import List from '../../models/List';
import PaymentsBaseResource from '../../resources/payments/base';

import ApiException from '../../exceptions/ApiException';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';

/**
 * The `payments` resource
 *
 * @static {string} resource
 * @static {Model}  model
 * @static {string} apiName
 */
export default class PaymentsResource extends PaymentsBaseResource {
  public static resource = 'payments';
  public static model = Payment;
  public static apiName = 'Payments API';

  // API METHODS

  /**
   * Create a payment in Mollie.
   *
   * @param {Mollie.Payment.Params.ICreate}  data
   * @param {Mollie.Payment.Callback.Create} cb   Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Payment>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/create-payment
   * @api ✓ This method is part of the public API
   */
  public async create(
    data: Mollie.Payment.Params.ICreate,
    cb?: Mollie.Payment.Callback.Create,
  ): Promise<Payment> {
    return super.create(data, cb) as Promise<Payment>;
  }

  /**
   * Retrieve a single payment from Mollie.
   *
   * @param {string}                      id     Payment ID
   * @param {Mollie.Payment.Params.IGet}  params
   * @param {Mollie.Payment.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Payment>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/get-payment
   * @api ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params?: Mollie.Payment.Params.IGet,
    cb?: Mollie.Payment.Callback.Get,
  ): Promise<Payment> {
    if (!startsWith(id, Payment.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Payment ID given');
    }

    return super.get(id, params, cb) as Promise<Payment>;
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @param {Mollie.Payment.Params.IList}  params List parameters
   * @param {Mollie.Payment.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Payment>>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/list-payments
   * @api ✓ This method is part of the public API
   */
  public async list(
    params?: Mollie.Payment.Params.IList,
    cb?: Mollie.Payment.Callback.List,
  ): Promise<List<Payment>> {
    return super.list(params, cb);
  }

  /**
   * Cancel the given payment.
   *
   * Will throw a ApiException if the payment id is invalid or the resource cannot be found.
   * Returns with HTTP status No Content (204) if successful.
   *
   * @param {string}                         id     Payment Id
   * @param {Mollie.Payment.Params.ICancel}  params
   * @param {Mollie.Payment.Callback.Cancel} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Payment>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/payments-api/cancel-payment
   * @api ✓ This method is part of the public API
   */
  public async cancel(
    id: string,
    params?: Mollie.Payment.Params.ICancel,
    cb?: Mollie.Payment.Callback.Cancel,
  ): Promise<Payment> {
    if (!startsWith(id, Payment.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Payment ID given');
    }
    const callback = typeof params === 'function' ? params : cb;

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
   * @api ✓ This method is part of the public API
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
   * @api ✓ This method is part of the public API
   * @alias cancel
   */
  delete = this.cancel;

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Payment> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${PaymentsResource.apiName}"`,
    );
  }
}
