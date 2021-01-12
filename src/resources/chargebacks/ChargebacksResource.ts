import { ListParameters } from './parameters';
import Callback from '../../types/Callback';
import Chargeback, { ChargebackData, injectPrototypes } from '../../data/chargebacks/Chargeback';
import List from '../../data/list/List';
import NetworkClient from '../../NetworkClient';
import ParentedResource from '../ParentedResource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class ChargebacksResource extends ParentedResource<ChargebackData, Chargeback> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'chargebacks';
  }

  /**
   * List chargebacks
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public all: ChargebacksResource['list'] = this.list;
  /**
   * List chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public page: ChargebacksResource['list'] = this.list;

  /**
   * List chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   */
  public list(parameters?: ListParameters): Promise<List<Chargeback>>;
  public list(parameters: ListParameters, callback: Callback<List<Chargeback>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'chargebacks', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
