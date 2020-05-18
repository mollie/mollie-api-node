import { GetParameters, ListParameters } from './parameters';
import { MethodData } from '../../data/methods/data';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Method, { injectPrototypes } from '../../data/methods/Method';
import Resource from '../Resource';
import renege from '../../plumbing/renege';

export default class MethodsResource extends Resource<MethodData, Method> {
  protected getResourceUrl(): string {
    return 'methods';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve a list of Payment Methods
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public all: MethodsResource['list'] = this.list;
  /**
   * Retrieve a list of Payment Methods
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public page: MethodsResource['list'] = this.list;

  /**
   * Retrieve a single Payment Method
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/get-method
   */
  public get(id: string, parameters?: GetParameters): Promise<Method>;
  public get(id: string, parameters: GetParameters, callback: Callback<Method>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    return this.network.get(`${this.getResourceUrl()}/${id}`, parameters);
  }

  /**
   * Retrieve a list of Payment Methods
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/methods-api/list-methods
   */
  public list(parameters?: ListParameters): Promise<List<Method>>;
  public list(parameters: ListParameters, callback: Callback<List<Method>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.network.list(this.getResourceUrl(), 'methods', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
