import { CreateParameters, GetParameters, ListParameters, RevokeParameters } from './parameters';
import { MandateData } from '../../../data/customers/mandates/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import List from '../../../data/list/List';
import Mandate, { injectPrototypes } from '../../../data/customers/mandates/Mandate';
import ParentedResource from '../../ParentedResource';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

/**
 * The `customers_mandates` resource
 *
 * @since 1.2.0
 */
export default class CustomersMandatesResource extends ParentedResource<MandateData, Mandate> {
  protected getResourceUrl(customerId: string): string {
    return `customers/${customerId}/mandates`;
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Get all of a customer's mandates
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all: CustomersMandatesResource['list'] = this.list;
  /**
   * Get all of a customer's mandates
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page: CustomersMandatesResource['list'] = this.list;
  /**
   * Alias for revoke
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   *
   * @public ✓ This method is part of the public API
   *
   * @alias revoke
   */
  public cancel: CustomersMandatesResource['revoke'] = this.revoke;
  /**
   * Alias for revoke
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   *
   * @public ✓ This method is part of the public API
   *
   * @alias revoke
   */
  public delete: CustomersMandatesResource['revoke'] = this.revoke;

  /**
   * Create a customer mandate
   *
   * @param params Create customer mandate parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/create-mandate
   *
   * @public ✓ This method is part of the public API
   */
  public create(parameters: CreateParameters): Promise<Mandate>;
  public create(parameters: CreateParameters, callback: Callback<Mandate>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const customerId = this.getParentId(parameters.customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...data } = parameters;
    return this.network.post(this.getResourceUrl(customerId), data);
  }

  /**
   * Get a customer mandate by ID
   *
   * @param id - customers_mandate id
   * @param params - Get customer mandate parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Customer mandate
   *
   * @since 1.2.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/get-mandate
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters: GetParameters): Promise<Mandate>;
  public get(id: string, parameters: GetParameters, callback: Callback<Mandate>): void;
  public get(id: string, parameters: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'mandate')) {
      throw new ApiError('The customers_mandate id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.get(`${this.getResourceUrl(customerId)}/${id}`, query);
  }

  /**
   * Get all of a customer's mandates
   *
   * @param params List mandates parameters
   *               (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found mandates
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/list-mandates
   *
   * @public ✓ This method is part of the public API
   */
  public list(parameters: ListParameters): Promise<List<Mandate>>;
  public list(parameters: ListParameters, callback: Callback<List<Mandate>>): void;
  public list(parameters: ListParameters) {
    if (renege(this, this.list, ...arguments)) return;
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer id is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.list(this.getResourceUrl(customerId), 'mandates', query).then(result => this.injectPaginationHelpers(result, this.list, parameters || {}));
  }

  /**
   * Delete a customer subscription
   *
   * @param id - customers_mandate id
   * @param params - Delete Customer parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate
   *
   * @public ✓ This method is part of the public API
   */
  public revoke(id: string, parameters: RevokeParameters): Promise<true>;
  public revoke(id: string, parameters: RevokeParameters, callback: Callback<true>): void;
  public revoke(id: string, parameters: RevokeParameters) {
    if (renege(this, this.revoke, ...arguments)) return;
    if (!checkId(id, 'mandate')) {
      throw new ApiError('The customers_mandate id is invalid');
    }
    // parameters || {} is used here, because in case withParent is used, parameters could be omitted.
    const customerId = this.getParentId((parameters || {}).customerId);
    if (!checkId(customerId, 'customer')) {
      throw new ApiError('The customer is invalid');
    }
    const { customerId: _, ...query } = parameters || {};
    return this.network.delete(`${this.getResourceUrl(customerId)}/${id}`) as Promise<true>;
  }
}
