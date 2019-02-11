import Resource from '../resource';
import Refund from '../models/Refund';
import List from '../models/List';
import ApiException from '../exceptions/ApiException';
import { IListParams } from '../types/refund/params';
import { ListCallback } from '../types/refund/callback';

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
      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Refund>>;
    }

    return super.list(params, cb);
  }

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Refund> {
    throw new ApiException(`The method "create" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async get(): Promise<Refund> {
    throw new ApiException(`The method "get" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Refund> {
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
