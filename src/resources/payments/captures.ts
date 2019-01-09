import { startsWith } from 'lodash';

import PaymentsBaseResource from '../../resources/payments/base';
import ApiException from '../../exceptions/ApiException';
import Capture from '../../models/Capture';
import List from '../../models/List';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';
import Payment from '../../models/Payment';
import { IGetParams, IListParams } from '../../types/payment/capture/params';
import { GetCallback, ListCallback } from '../../types/payment/capture/callback';

/**
 * The `payments_captures` resource
 *
 * @static {string} resource
 * @static {Model} model
 *
 * @since 1.1.1
 */
export default class PaymentsCapturesResource extends PaymentsBaseResource {
  static resource = 'payments_captures';
  static model = Capture;
  static apiName = 'Captures API';

  // AVAILABLE API METHODS

  /**
   * Get a Payment Capture by ID
   *
   * @param id - Capture ID
   * @param params - Get Payment Capture parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Capture object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-Capture
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params: IGetParams, cb?: GetCallback): Promise<Capture> {
    const { paymentId, ...parameters } = params;
    if (!startsWith(id, Payment.resourcePrefix)) {
      throw new InvalidArgumentException('Invalid Payment ID given');
    }
    this.setParentId(paymentId);

    return (super.get(id, parameters, cb) as unknown) as Promise<Capture>;
  }

  /**
   * Retrieve a list of Payment Captures
   *
   * @param params - Retrieve Payment Captures list parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Captures
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   * @public ✓ This method is part of the public API
   */
  public async list(params: IListParams, cb?: ListCallback): Promise<List<Capture>> {
    const { paymentId, ...parameters } = params;
    this.setParentId(paymentId);

    return super.list(parameters, cb);
  }

  // ALIASES

  /**
   * Retrieve a list of Payment Captures
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   * @public ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Capture> {
    throw new ApiException(
      `The method "${this.create.name}" does not exist on the "${
        PaymentsCapturesResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Capture> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${
        PaymentsCapturesResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${
        PaymentsCapturesResource.apiName
      }"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${
        PaymentsCapturesResource.apiName
      }"`,
    );
  }
}
