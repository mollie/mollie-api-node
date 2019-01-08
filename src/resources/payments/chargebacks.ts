import { startsWith } from 'lodash';

import PaymentsBaseResource from '../../resources/payments/base';
import ApiException from '../../exceptions/ApiException';
import Chargeback from '../../models/Chargeback';
import List from '../../models/List';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';
import Payment from '../../models/Payment';
import { IGetParams, IListParams } from '../../types/payment/chargeback/params';
import { GetCallback, ListCallback } from '../../types/payment/chargeback/callback';

/**
 * The `payments_chargebacks` resource
 *
 * @static {string} resource
 * @static {Model} model
 *
 * @since 1.1.1
 */
export default class PaymentsChargebacksResource extends PaymentsBaseResource {
  static resource = 'payments_chargebacks';
  static model = Chargeback;
  static apiName = 'Chargebacks API';

  // AVAILABLE API METHODS

  /**
   * Get a Payment Chargeback by ID
   *
   * @param id - Chargeback ID
   * @param params - Get Payment Chargeback parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Chargeback object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params: IGetParams, cb?: GetCallback): Promise<Chargeback> {
    const { paymentId, ...parameters } = params;
    if (!startsWith(id, Payment.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Payment ID given');
    }
    this.setParentId(paymentId);

    return (super.get(id, parameters, cb) as unknown) as Promise<Chargeback>;
  }

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @param params - Retrieve Payment Chargebacks list parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Chargebacks
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @public ✓ This method is part of the public API
   */
  public async list(params: IListParams, cb?: ListCallback): Promise<List<Chargeback>> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    return super.list(parameters, cb);
  }

  // ALIASES

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @public ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Chargeback> {
    throw new ApiException(
      `The method "${this.create.name}" does not exist on the "${
        PaymentsChargebacksResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Chargeback> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${
        PaymentsChargebacksResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${
        PaymentsChargebacksResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${
        PaymentsChargebacksResource.apiName
      }"`,
    );
  }
}
