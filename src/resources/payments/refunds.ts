import PaymentsResource from './base';
import Refund from '../../models/Refund';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import {
  ICancelParams,
  ICreateParams,
  IGetParams,
  IListParams,
} from '../../types/paymentrefund/params';
import {
  CancelCallback,
  CreateCallback,
  GetCallback,
  ListCallback,
} from '../../types/paymentrefund/callback';

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
   * @param params - Create Payment Refund parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly create Payment Refund
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/create-refund#
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Refund> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    return super.create(parameters, cb) as Promise<Refund>;
  }

  /**
   * Get a payment refund by ID
   *
   * @param id - Refund ID
   * @param params - Retrieve Payment Refund parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Refund> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    return super.get(id, parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all payment refunds. Alias of list.
   *
   * @param params - List Payment Refunds parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Refund>> {
    return super.list(params, cb) as Promise<List<Refund>>;
  }

  /**
   * Delete a payment_refund by ID
   *
   * @param id - Refund ID
   * @param params - Delete Payment Refund parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @return Success status
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   * @public ✓ This method is part of the public API
   */
  cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<boolean> {
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
   * @public ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;

  /**
   * Cancel a Payment Refund by ID
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   * @public ✓ This method is part of the public API
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
