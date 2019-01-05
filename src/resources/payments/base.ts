import Resource from '../../resource';
import Payment from '../../models/payment';
import List from '../../models/list';
import { AxiosResponse } from 'axios';

/**
 * Payments base resource
 */
export default class PaymentsResource extends Resource {
  public readonly apiName = 'Payments API';
  public readonly resourcePrefix = 'tr_';

  /**
   * Set the parent
   * @since 2.0.0
   */
  protected setParent(params: any = {}) {
    if (!params.paymentId && !this.hasParentId()) {
      throw TypeError('Missing parameter "paymentId".');
    } else if (params.paymentId) {
      this.setParentId(params.paymentId);
    }
  }

  // API METHODS

  /**
   * Create a payment in Mollie.
   *
   * @doc https://docs.mollie.com/reference/v2/payments-api/create-payment
   * @api This method is part of the public API
   */
  public create(data: any, cb?: Function): Promise<Payment> {
    return super.create(data, cb);
  }

  public async get(id: string, params?: any, cb?: Function): Promise<Payment> {
    return super.get(id, params, cb);
  }

  /**
   * Cancel the given Payment.
   *
   * Will throw a ApiException if the payment id is invalid or the resource cannot be found.
   * Returns with HTTP status No Content (204) if successful.
   *
   * @param {string}   id Payment Id
   * @param {Function} cb Callback function
   *
   * @return {Promise<Payment>}
   *
   * @api This method is part of the public API
   */
  public cancel(id: string, cb?: Function): Promise<AxiosResponse> {
    return this.delete(id, cb);
  }

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @since 2.0.0
   *
   * @api This method is part of the public API
   */
  public list(params?: any, cb?: Function): Promise<List> {
    return super.list(params, cb);
  }

  // PHP Client equivalents
  public page() {}

  // ALIASES

  /**
   * Retrieve all payments created with the current website profile, ordered from newest to oldest.
   *
   * @since 2.0.0
   *
   * @api This method is part of the public API
   */
  public all(params?: any, cb?: Function): Promise<List> {
    return super.list(params, cb);
  }

  /**
   * Cancel the given Payment. This is just an alias of the 'cancel' method.
   *
   * Will throw a ApiException if the payment id is invalid or the resource cannot be found.
   * Returns with HTTP status No Content (204) if successful.
   *
   * @param {string}   id Payment Id
   * @param {Function} cb Callback function
   *
   * @return Payment
   *
   * @api This method is part of the public API
   */
  public delete(id: string, cb?: Function): Promise<AxiosResponse> {
    return super.delete(id, cb);
  }
}
