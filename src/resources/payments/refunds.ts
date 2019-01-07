import PaymentsResource from './base';
import Refund from '../../models/Refund';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';

/**
 * The `payments_refunds` resource
 *
 * @static {string} resource
 * @static {Object} model
 * @static {string} apiName
 *
 * @since 1.1.1
 */
export default class PaymentsRefundsResource extends PaymentsResource {
  public static resource = 'payments_refunds';
  public static model = Refund;
  public static apiName = 'Refunds API';

  // API METHODS

  /**
   * Create a payment refund
   *
   * @param {Mollie.PaymentRefund.Params.ICreate}  data
   * @param {Mollie.PaymentRefund.Callback.Create} cb   Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Refund>}
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-refund#
   * @api ✓ This method is part of the public API
   */
  public async create(
    data: Mollie.PaymentRefund.Params.ICreate,
    cb?: Mollie.PaymentRefund.Callback.Create,
  ): Promise<Refund> {
    const { paymentId, ...params } = data;
    this.setParentId(paymentId);

    return super.create(params, cb) as Promise<Refund>;
  }

  /**
   * Get a payment refund by ID
   *
   * @param {string}                            id     Refund ID
   * @param {Mollie.PaymentRefund.Params.IGet}  params
   * @param {Mollie.PaymentRefund.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
   * @api ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params?: Mollie.PaymentRefund.Params.IGet,
    cb?: Mollie.PaymentRefund.Callback.Get,
  ): Promise<Refund> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    return super.get(id, parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all payment refunds. Alias of list.
   *
   * @param {Mollie.PaymentRefund.Params.IList}  params
   * @param {Mollie.PaymentRefund.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @api ✓ This method is part of the public API
   */
  public async list(
    params?: Mollie.PaymentRefund.Params.IList,
    cb?: Mollie.PaymentRefund.Callback.List,
  ): Promise<List<Refund>> {
    return super.list(params, cb) as Promise<List<Refund>>;
  }

  /**
   * Delete a payment_refund by ID
   *
   * @param {string}                               id     Refund ID
   * @param {Mollie.PaymentRefund.Params.ICancel}  params
   * @param {Mollie.PaymentRefund.Callback.Cancel} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @return {Promise<boolean>} Status
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   * @api ✓ This method is part of the public API
   */
  cancel(
    id: string,
    params?: Mollie.PaymentRefund.Params.ICancel,
    cb?: Mollie.PaymentRefund.Callback.Cancel,
  ): Promise<boolean> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    // TODO: double-check if super actually returns a boolean status
    return super.delete(id, parameters, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * Get all payment refunds. Alias of list.
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @api ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;

  /**
   * Cancel a Payment Refund by ID
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   * @api ✓ This method is part of the public API
   * @alias cancel
   */
  delete = this.cancel;

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  async update(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${PaymentsRefundsResource.apiName}"`,
    );
  }
}
