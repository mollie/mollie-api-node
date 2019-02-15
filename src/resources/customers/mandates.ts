import { defaults, get, startsWith } from 'lodash';

import CustomersBaseResource from './base';
import List from '../../models/List';
import Mandate from '../../models/Mandate';
import { ICreateParams, IGetParams, IListParams, IRevokeParams } from '../../types/mandate/params';
import { CreateCallback, GetCallback, ListCallback, RevokeCallback } from '../../types/mandate/callback';
import Customer from '../../models/Customer';
import Resource from '../../resource';
import NotImplementedException from '../../exceptions/NotImplementedException';

/**
 * The `customers_mandates` resource
 *
 * @since 1.2.0
 */
export default class CustomersMandatesResource extends CustomersBaseResource {
  public static resource = 'customers_mandates';
  public static model = Mandate;
  public apiName = 'Mandates API';

  /**
   * Get all of a customer's mandates
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * Get all of a customer's mandates
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  public page = this.list;
  /**
   * Alias for revoke
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   * @alias delete
   */
  public cancel = this.revoke;
  /**
   * Alias for revoke
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   * @public ✓ This method is part of the public API
   * @alias delete
   */
  public delete = this.revoke;

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
    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Mandate>;
  }

  /**
   * Get a customer mandate by ID
   *
   * @param id - customers_mandate id
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
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Mandate> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Mandate.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customers_mandate id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Mandate>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(id, Mandate.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customers_mandate id is invalid' } });
    }
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } });
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
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Mandate>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Mandate>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } });
    }

    this.setParentId(customerId);

    return super.list(parameters, cb);
  }

  /**
   * Delete a customer subscription
   *
   * @param id - customers_mandate id
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
  public async revoke(id: string, params?: IRevokeParams | RevokeCallback, cb?: RevokeCallback): Promise<Mandate> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(id, Mandate.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customers_mandate id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } }, typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.delete(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Mandate>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 2.2.0)
    const { customerId } = defaults(params, { customerId: this.parentId });
    if (!startsWith(id, Mandate.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customers_mandate id is invalid' } });
    }
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      throw Resource.errorHandler({ error: { message: 'The customer id is invalid' } });
    }
    this.setParentId(customerId);

    return super.delete(id, cb) as Promise<Mandate>;
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Mandate> {
    throw new NotImplementedException('This method does not exist', this.apiName);
  }
}
