import { startsWith } from 'lodash';

import Resource from '../resource';
import Chargeback from '../models/Chargeback';
import List from '../models/List';

import ApiException from '../exceptions/ApiException';

/**
 * The `chargebacks` resource
 * @static {string} resource
 * @static {Object} model
 * @since 2.0.0-rc.1
 */
export default class ChargebacksResource extends Resource {
  static resource = 'chargebacks';
  static model = Chargeback;
  static apiName = 'Chargebacks API';

  /**
   *
   * @param {Mollie.Chargeback.Params.IList}  params
   * @param {Mollie.Chargeback.Callback.List} cb
   *
   * @returns {Promise<List<Chargeback>>}
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   * @api ✓ This method is part of the public API
   */
  public async list(
    params: Mollie.Chargeback.Params.IList,
    cb: Mollie.Chargeback.Callback.List,
  ): Promise<List<Chargeback>> {
    if (params.from && !startsWith(params.from, ChargebacksResource.resourcePrefix)) {
      throw new ApiException('Invalid Chargeback ID given');
    }

    return super.list(params, cb) as Promise<List<Chargeback>>;
  }

  // UNAVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async create(): Promise<Chargeback> {
    throw new ApiException(
      `The method "${this.create.name}" does not exist on the "${ChargebacksResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async update(id: string, data: any, cb?: Function): Promise<Chargeback> {
    throw new ApiException(
      `The method "${this.update.name}" does not exist on the "${ChargebacksResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async get(id: string, params?: any, cb?: Function): Promise<Chargeback> {
    throw new ApiException(
      `The method "${this.get.name}" does not exist on the "${ChargebacksResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.cancel.name}" does not exist on the "${ChargebacksResource.apiName}"`,
    );
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(
      `The method "${this.delete.name}" does not exist on the "${ChargebacksResource.apiName}"`,
    );
  }
}
