import { startsWith } from 'lodash';

import PaymentsBaseResource from '../../resources/payments/base';
import ApiException from '../../exceptions/ApiException';
import Chargeback from '../../models/Chargeback';
import List from '../../models/List';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';
import Payment from '../../models/Payment';

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
   * @param {string}                                id     Chargeback ID
   * @param {Mollie.PaymentChargeback.Params.IGet}  params
   * @param {Mollie.PaymentChargeback.Callback.Get} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Chargeback>}
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
   * @api ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params: Mollie.PaymentChargeback.Params.IGet,
    cb?: Mollie.PaymentChargeback.Callback.Get,
  ): Promise<Chargeback> {
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
   * @param {Mollie.PaymentChargeback.Params.IList}  params
   * @param {Mollie.PaymentChargeback.Callback.List} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Chargeback>>}
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @api ✓ This method is part of the public API
   */
  public async list(
    params: Mollie.PaymentChargeback.Params.IList,
    cb?: Mollie.PaymentChargeback.Callback.List,
  ): Promise<List<Chargeback>> {
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
   * @api ✓ This method is part of the public API
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
