import Resource from '../resource';
import Refund from '../models/Refund';
import List from '../models/List';

import ApiException from '../exceptions/ApiException';

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

  public async list(
    params?: Mollie.Refund.Params.IList,
    cb?: Mollie.Refund.Callback.List,
  ): Promise<List<Refund>> {
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
