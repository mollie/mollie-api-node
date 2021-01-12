import { GetParameters, ListParameters } from './parameters';
import { MethodData } from '../../data/methods/data';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import Method, { injectPrototypes } from '../../data/methods/Method';
import NetworkClient from '../../NetworkClient';
import Resource from '../Resource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class MethodsResource extends Resource<MethodData, Method> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'methods';
  }

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
    return this.networkClient.get(`${this.getResourceUrl()}/${id}`, parameters);
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
    return this.networkClient.list(this.getResourceUrl(), 'methods', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
