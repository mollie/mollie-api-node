import CustomersBaseResource from './base';
import List from '../../models/List';
import Mandate from '../../models/Mandate';
import ApiException from '../../exceptions/ApiException';
import { ICreateParams, IGetParams, IListParams, IRevokeParams } from '../../types/mandate/params';
import {
  CreateCallback,
  GetCallback,
  ListCallback,
  RevokeCallback,
} from '../../types/mandate/callback';

/**
 * The `customers_mandates` resource
 *
 * @static {string} resource
 * @static {Object} model
 * @static {string} apiName
 *
 * @since 1.2.0
 */
export default class CustomersMandatesResource extends CustomersBaseResource {
  public static resource = 'customers_mandates';
  public static model = Mandate;
  public static apiName = 'Mandates API';

  // API METHODS

  /**
   * Create a customer mandate
   *
   * @param {ICreateParams}  params
   * @param {CreateCallback} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Mandate>>}
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Mandate> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Mandate>;
  }

  /**
   * Get a customer mandate by ID
   *
   * @param {string}      id     Mandate ID
   * @param {IGetParams}  params
   * @param {GetCallback} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Mandate>}
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Mandate> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.get(id, parameters, cb) as Promise<Mandate>;
  }

  /**
   * Get all of a customer's mandates
   *
   * @param {IListParams}  params
   * @param {ListCallback} cb     Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<List<Mandate>>}
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Mandate>> {
    const { customerId, ...parameters } = params;
    this.setParentId(customerId);

    return super.list(parameters, cb);
  }

  /**
   * Delete a customer subscription
   *
   * @param id - Mandate ID
   * @param params - Delete Customer parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   */
  public async revoke(id: string, params?: IRevokeParams, cb?: RevokeCallback): Promise<boolean> {
    const { customerId } = params;
    this.setParentId(customerId);

    // TODO: check parent return type
    return super.delete(id, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * Alias for revoke
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   * @alias delete
   */
  cancel = this.revoke;

  /**
   * Alias for revoke
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   * @alias delete
   */
  delete = this.revoke;

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async update(): Promise<Mandate> {
    throw new ApiException(
      `The method "${this.update.name}" is not available on the "${
        CustomersMandatesResource.apiName
      }"`,
    );
  }
}
