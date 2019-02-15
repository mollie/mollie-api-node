import Resource from '../resource';
import Refund from '../models/Refund';
import List from '../models/List';
import { IListParams } from '../types/refund/params';
import { ListCallback } from '../types/refund/callback';
import NotImplementedException from '../exceptions/NotImplementedException';

/**
 * The `refunds` resource
 *
 * @since 2.0.0
 */
export default class RefundsResource extends Resource {
  public static resource = 'refunds';
  public static model = Refund;
  public apiName = 'Refunds API';

  /**
   * List Refunds
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public
   */
  public all = this.list;
  /**
   * List Refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public
   */
  public page = this.list;

  /**
   * List Refunds
   *
   * @param params - List Refunds parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Refunds
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Refund>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Refund>>;
    }

    return super.list(params, cb);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async create(): Promise<Refund> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async get(): Promise<Refund> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Refund> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }
}
