import { get, startsWith } from 'lodash';

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
import Customer from '../../models/Customer';
import Resource from '../../resource';

/**
 * The `customers_mandates` resource
 *
 * @since 1.2.0
 */
export default class CustomersMandatesResource extends CustomersBaseResource {
  public resource = 'customers_mandates';
  public model = Mandate;
  public apiName = 'Mandates API';

  // API METHODS

  /**
   * Create a customer mandate
   *
   * @param params Create customer mandate parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
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
   * @param id - Mandate ID
   * @param params - Get customer mandate parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Customer mandate
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
   * @public ✓ This method is part of the public API
   */
  public async get(
    id: string,
    params?: IGetParams | GetCallback,
    cb?: GetCallback,
  ): Promise<Mandate> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler(
          Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
        );
      }

      return super.get(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Mandate>;
    }

    const { customerId, ...parameters } = params;
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
      );
    }

    this.setParentId(customerId);

    return super.get(id, parameters, cb) as Promise<Mandate>;
  }

  /**
   * Get all of a customer's mandates
   *
   * @param params List mandates parameters
   *               (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found mandates
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  public async list(params: IListParams | ListCallback, cb?: ListCallback): Promise<List<Mandate>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler(
          Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
        );
      }

      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Mandate>>;
    }

    const { customerId, ...parameters } = params;
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
      );
    }

    this.setParentId(customerId);

    return super.list(parameters, cb);
  }

  /**
   * Delete a customer subscription
   *
   * @param id - Mandate ID
   * @param params - Delete Customer parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   */
  public async revoke(
    id: string,
    params?: IRevokeParams | RevokeCallback,
    cb?: RevokeCallback,
  ): Promise<boolean> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.errorHandler(
          Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
        );
      }

      return super.delete(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<boolean>;
    }

    const { customerId } = params;
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, cb),
      );
    }

    this.setParentId(customerId);

    // TODO: check parent return type
    return super.delete(id, cb) as Promise<boolean>;
  }

  // ALIASES

  /**
   * Get all of a customer's mandates
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  all = this.list;

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
    throw new ApiException(`The method "update" is not available on the "${this.apiName}"`);
  }
}
