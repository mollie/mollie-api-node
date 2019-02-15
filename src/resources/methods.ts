import Resource from '../resource';
import Method from '../models/Method';
import List from '../models/List';
import ApiException from '../exceptions/ApiException';
import { IGetParams, IListParams } from '../types/method/params';
import { GetCallback, ListCallback } from '../types/method/callback';

/**
 * The `methods` resource
 *
 * @since 1.0.0
 */
export default class MethodsResource extends Resource {
  public static resource = 'methods';
  public static model = Method;
  public apiName = 'Methods API';

  /**
   * Retrieve a single Payment Method
   *
   * @param id - Method ID
   * @param params - Retrieve Payment Method parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Payment Method object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Method> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!id) {
        throw Resource.errorHandler({ error: { message: 'The method id is invalid' } }, typeof params === 'function' ? params : cb);
      }

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Method>;
    }

    if (!id) {
      throw Resource.errorHandler({ error: { message: 'The method id is invalid' } });
    }

    return super.get(id, params, cb) as Promise<Method>;
  }

  /**
   * Retrieve a list of Payment Methods
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * Retrieve a list of Payment Methods
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   * @public ✓ This method is part of the public API
   */
  public page = this.list;

  /**
   * Retrieve a list of Payment Methods
   *
   * @param params - Retrieve Payment Method parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Methods
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Method>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Method>>;
    }

    return super.list(params, cb) as Promise<List<Method>>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async create(): Promise<Method> {
    throw new ApiException(`The method "create" is not available on the "${this.apiName}"`);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Method> {
    throw new ApiException(`The method "update" is not available on the "${this.apiName}"`);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(`The method "cancel" is not available on the "${this.apiName}"`);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(`The method "delete" is not available on the "${this.apiName}"`);
  }
}
