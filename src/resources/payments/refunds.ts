import { get, startsWith } from 'lodash';

import PaymentsResource from './base';
import Refund from '../../models/Refund';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import { ICancelParams, ICreateParams, IGetParams, IListParams } from '../../types/payment/refund/params';
import { CancelCallback, CreateCallback, GetCallback, ListCallback } from '../../types/payment/refund/callback';
import Payment from '../../models/Payment';
import Resource from '../../resource';

/**
 * The `payments_refunds` resource
 *
 * @since 1.1.1
 */
export default class PaymentsRefundsResource extends PaymentsResource {
  public static resource = 'payments_refunds';
  public static model = Refund;
  public apiName = 'Refunds API';

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

  /**
   * Create a payment refund
   *
   * @param params - Create Payment Refund parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
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
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.errorHandler(Resource.errorHandler({ error: { message: 'The payment id is invalid' } }, cb));
    }
    this.setParentId(paymentId);

    return super.create(parameters, cb) as Promise<Refund>;
  }

  /**
   * Get a payment refund by ID
   *
   * @param id - Refund ID
   * @param params - Retrieve Payment Refund parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/get-refund
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Refund> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Refund.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The refund id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      const paymentId = get(params, 'paymentId') || this.parentId;
      if (!startsWith(paymentId, Payment.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The payment id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      this.setParentId(paymentId);

      return super.get(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Refund>;
    }

    if (!startsWith(id, Refund.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The refund id is invalid' } }, cb);
    }
    const { paymentId, ...parameters } = params;
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } }, cb);
    }
    this.setParentId(paymentId);

    return super.get(id, parameters, cb) as Promise<Refund>;
  }

  /**
   * Get all payment refunds.
   *
   * @param params - List Payment Refunds parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Refund>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const paymentId = get(params, 'paymentId') || this.parentId;
      if (!startsWith(paymentId, Payment.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The payment id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      this.setParentId(paymentId);

      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Refund>>;
    }

    const { paymentId, ...parameters } = params;
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } });
    }
    this.setParentId(paymentId);

    return super.list(parameters, cb) as Promise<List<Refund>>;
  }

  /**
   * Delete a payment refund by ID
   *
   * @param id - Refund ID
   * @param params - Cancel payment refund parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @return Success status
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/cancel-refund
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams | CancelCallback, cb?: CancelCallback): Promise<Refund> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Refund.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The refund id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }
      const paymentId = get(params, 'paymentId') || this.parentId;
      if (!startsWith(paymentId, Payment.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The payment id is invalid' } },
          typeof params === 'function' ? params : cb,
        );
      }

      return super.delete(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Refund>;
    }

    if (!startsWith(id, Refund.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The refund id is invalid' } });
    }
    const { paymentId, ...parameters } = params;
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } });
    }
    this.setParentId(paymentId);

    return super.delete(id, parameters, cb) as Promise<Refund>;
  }

  /**
   * @deprecated This method is not available
   */
  async update(): Promise<Refund> {
    throw new ApiException(`The method "update" does not exist on the "${this.apiName}"`);
  }
}
