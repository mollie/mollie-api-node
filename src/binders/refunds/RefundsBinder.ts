import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import List from '../../data/list/List';
import { RefundData } from '../../data/refunds/data';
import Refund from '../../data/refunds/Refund';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { IterateParameters, ListParameters } from './parameters';

const pathSegment = 'refunds';

export default class RefundsBinder extends Binder<RefundData, Refund> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve a list of all of your refunds.
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

  /**
   * Retrieve a list of all of your refunds.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 3.6.0
   * @see https://docs.mollie.com/reference/v2/refunds-api/list-refunds
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<RefundData, Refund>(pathSegment, 'refunds', query, valuesPerMinute);
  }
}
