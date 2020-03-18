import Resource from '../Resource';
import { MethodData } from '../../data/methods/data';
import Method, { injectPrototypes } from '../../data/methods/Method';
import { GetParameters, ListParameters } from './parameters';
import List from '../../data/list/List';

/**
 * The `methods` resource
 *
 * @since 1.0.0
 */
export default class MethodsResource extends Resource<MethodData, Method> {
  protected getResourceUrl(): string {
    return 'methods';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve a single Payment Method
   *
   * @param id - Method ID
   * @param params - Retrieve Payment Method parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Payment Method object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method
   *
   * @public ✓ This method is part of the public API
   */
  public get(id: string, parameters?: GetParameters): Promise<Method> {
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Retrieve a list of Payment Methods
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   *
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * Retrieve a list of Payment Methods
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   *
   * @public ✓ This method is part of the public API
   */
  public page = this.list;

  /**
   * Retrieve a list of Payment Methods
   *
   * @param params - Retrieve Payment Method parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Methods
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   *
   * @public ✓ This method is part of the public API
   */
  public async list(parameters: ListParameters = {}): Promise<List<Method>> {
    const result = await this.network.list(this.getResourceUrl(), 'methods', parameters);
    return this.injectPaginationHelpers(result, this.list, parameters);
  }
}
