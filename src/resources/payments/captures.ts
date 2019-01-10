import { get, startsWith } from 'lodash';

import PaymentsBaseResource from '../../resources/payments/base';
import ApiException from '../../exceptions/ApiException';
import Capture from '../../models/Capture';
import List from '../../models/List';
import Payment from '../../models/Payment';
import { IGetParams, IListParams } from '../../types/payment/capture/params';
import { GetCallback, ListCallback } from '../../types/payment/capture/callback';
import Resource from '../../resource';

/**
 * The `payments_captures` resource
 *
 * @since 1.1.1
 */
export default class PaymentsCapturesResource extends PaymentsBaseResource {
  public resource = 'payments_captures';
  public model = Capture;
  public apiName = 'Captures API';

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

  /**
   * Get a Payment Capture by ID
   *
   * @param id - Capture ID
   * @param params - Get Payment Capture parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Capture object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/get-Capture
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params: IGetParams, cb?: GetCallback): Promise<Capture> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Capture.resourcePrefix)) {
        Resource.errorHandler(
          { error: { message: 'The capture id is invalid' } },
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
      ) as Promise<Capture>;
    }

    if (!startsWith(id, Capture.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The capture id is invalid' } });
    }
    const { paymentId, ...parameters } = params;
    if (!startsWith(id, Payment.resourcePrefix)) {
      Resource.errorHandler({ error: { message: 'The payment id is invalid' } });
    }
    this.setParentId(paymentId);

    return (super.get(id, parameters, cb) as unknown) as Promise<Capture>;
  }

  /**
   * Retrieve a list of Payment Captures
   *
   * @param params - Retrieve Payment Captures list parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Captures
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/captures-api/list-captures
   * @public ✓ This method is part of the public API
   */
  public async list(params: IListParams | ListCallback, cb?: ListCallback): Promise<List<Capture>> {
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
      ) as Promise<List<Capture>>;
    }

    const { paymentId, ...parameters } = params;
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.errorHandler(Resource.errorHandler({ error: { message: 'The payment id is invalid' } }));
    }
    this.setParentId(paymentId);

    return super.list(parameters, cb);
  }

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Capture> {
    throw new ApiException(`The method "create" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Capture> {
    throw new ApiException(`The method "update" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(`The method "cancel" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(`The method "delete" does not exist on the "${this.apiName}"`);
  }
}
