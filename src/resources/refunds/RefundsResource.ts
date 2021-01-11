import { ListParameters } from './parameters';
import { RefundData } from '../../data/refunds/data';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import NetworkClient from '../../NetworkClient';
import Refund, { injectPrototypes } from '../../data/refunds/Refund';
import Resource from '../Resource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class RefundsResource extends Resource<RefundData, Refund> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'refunds';
  }

  /**
   * List Refunds
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public all: RefundsResource['list'] = this.list;
  /**
   * List Refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public page: RefundsResource['list'] = this.list;

  /**
   * List Refunds
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public list(parameters?: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'refunds', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
