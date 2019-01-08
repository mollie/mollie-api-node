import Resource from '../resource';
import Refund from '../models/Refund';
import List from '../models/List';

import ApiException from '../exceptions/ApiException';
import { IListParams } from '../types/refund/params';
import { ListCallback } from '../types/refund/callback';

/**
 * The `refunds` resource
 *
 * @static {string} resource
 * @static {Object} model
 *
 * @since 2.0.0
 */
export default class RefundsResource extends Resource {
  public static resource = 'refunds';
  public static model = Refund;
  public static apiName = 'Refunds API';

  // API METHODS

  /**
   * List Refunds
   *
   * @param params - List Refunds parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Refunds
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   * @public
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Refund>> {
    return super.list(params, cb);
  }

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.create.name}" does not exist on the "${RefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async get(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.get.name}" does not exist on the "${RefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Refund> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${RefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${RefundsResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${RefundsResource.apiName}"`,
    );
  }
}
