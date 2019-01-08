import Resource from '../resource';
import Method from '../models/Method';
import List from '../models/List';
import ApiException from '../exceptions/ApiException';
import { IGetParams, IListParams } from '../types/method/params';
import { GetCallback, ListCallback } from '../types/method/callback';

/**
 * The `methods` resource
 *
 * @static {string} resource
 * @static {Object} model
 * @static {string} apiName
 *
 * @since 1.0.0
 */
export default class MethodsResource extends Resource {
  public static resource = 'methods';
  public static model = Method;
  public static apiName = 'Methods API';

  /**
   * Retrieve a single Payment Method
   *
   * @param id - Method ID
   * @param params - Retrieve Payment Method parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Payment Method object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Method> {
    return super.get(id, params, cb) as Promise<Method>;
  }

  /**
   * Retrieve a list of Payment Methods
   *
   * @param params - Retrieve Payment Method parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Methods
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Method>> {
    return super.list(params, cb) as Promise<List<Method>>;
  }

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Method> {
    throw new ApiException(
      `The method "${this.create.name}" is not available on the "${MethodsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Method> {
    throw new ApiException(
      `The method "${this.update.name}" is not available on the "${MethodsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" is not available on the "${MethodsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  delete = this.cancel;
}
