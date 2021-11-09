import List from '../../data/list/List';
import { RefundData } from '../../data/refunds/data';
import Refund from '../../data/refunds/Refund';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { ListParameters } from './parameters';

const pathSegment = 'refunds';

export default class RefundsBinder extends Binder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
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
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public all: RefundsBinder['page'] = this.page;
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
   * @deprecated Use `page` instead.
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public list: RefundsBinder['page'] = this.page;

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
  public page(parameters?: ListParameters): Promise<List<Refund>>;
  public page(parameters: ListParameters, callback: Callback<List<Refund>>): void;
  public page(parameters: ListParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.list<RefundData, Refund>(pathSegment, 'refunds', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }
}
