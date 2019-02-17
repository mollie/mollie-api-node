/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import Resource from '../resource';
import Chargeback from '@models/Chargeback';
import List from '@models/List';

import { IListParams } from '@mollie-types/chargeback/params';
import { ListCallback } from '@mollie-types/chargeback/callback';
import NotImplementedError from '@errors/NotImplementedError';

/**
 * The `chargebacks` resource
 *
 * @since 2.0.0-rc.1
 */
export default class ChargebacksResource extends Resource {
  public static resource = 'chargebacks';
  public static model = Chargeback;
  public apiName = 'Chargebacks API';

  /**
   * List chargebacks
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @public ✓ This method is part of the public API
   * @alias list
   */
  public all = this.list;
  /**
   * List chargebacks
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @public ✓ This method is part of the public API
   * @alias list
   */
  public page = this.list;

  /**
   * List chargebacks
   *
   * @param params - List chargebacks parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Chargebacks
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Chargeback>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Chargeback>>;
    }

    return super.list(params, cb) as Promise<List<Chargeback>>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async create(): Promise<Chargeback> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(id: string, data: any, cb?: Function): Promise<Chargeback> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(id: string, params: any, cb?: Function): Promise<Chargeback> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
