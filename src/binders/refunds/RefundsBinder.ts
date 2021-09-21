import { ListParameters } from './parameters';
import { RefundData } from '../../data/refunds/data';
import Callback from '../../types/Callback';
import List from '../../data/list/List';
import NetworkClient from '../../NetworkClient';
import Refund, { injectPrototypes } from '../../data/refunds/Refund';
import Binder from '../Binder';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class RefundsBinder extends Binder<RefundData, Refund> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'refunds';
  }

  /**
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 2.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public all: RefundsBinder['list'] = this.list;
  /**
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public page: RefundsBinder['list'] = this.list;

  /**
   * Retrieve Refunds.
   *
   * -   If the payment-specific endpoint is used, only Refunds for that specific Payment are returned.
   * -   When using the top level endpoint `v2/refunds` with an API key, only refunds for the corresponding website profile and mode are returned.
   * -   When using the top level endpoint with OAuth, you can specify the profile and mode with the `profileId` and `testmode` parameters respectively. If you omit `profileId`, you will get all
   *     Refunds for the Organization.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.0.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public list(parameters?: ListParameters): Promise<List<Refund>>;
  public list(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public list(parameters: ListParameters = {}) {
    if (renege(this, this.list, ...arguments)) return;
    return this.networkClient.list(this.getResourceUrl(), 'refunds', parameters).then(result => this.injectPaginationHelpers(result, this.list, parameters));
  }
}
