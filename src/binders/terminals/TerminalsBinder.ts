import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type GetParameters, type PageParameters, IterateParameters } from './parameters';
import { Page } from '../../types';
import Terminal from '../../data/terminals/Terminal';
import type { TerminalData } from '../../data/terminals/data';
import assertWellFormedId from '../../plumbing/assertWellFormedId';

const pathSegment = 'terminals';

export default class TerminalsBinder extends Binder<TerminalData, Terminal> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve a single terminal object by its terminal ID. This terminal object symbolizes the physical device that you have received from us.
   *
   * For more information on accepting point-of-sale payments, please refer to the [point-of-sale guide](https://docs.mollie.com/point-of-sale/overview).
   *
   * @since 4.3.0
   * @see https://docs.mollie.com/reference/get-terminal
   */
  public get(id: string, parameters?: GetParameters): Promise<Terminal>;
  public get(id: string, parameters: GetParameters, callback: Callback<Terminal>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'terminal');
    return this.networkClient.get(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve a list of all of your terminals.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 4.3.0
   * @see https://docs.mollie.com/reference/list-terminals
   */
  public page(parameters?: PageParameters): Promise<Page<Terminal>>;
  public page(parameters: PageParameters, callback: Callback<Page<Terminal>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<TerminalData, Terminal>(pathSegment, 'terminals', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a list of all of your terminals.
   *
   * The results are paginated. See pagination for more information.
   *
   * @since 4.3.0
   * @see https://docs.mollie.com/reference/list-terminals
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<TerminalData, Terminal>(pathSegment, 'terminals', query, valuesPerMinute);
  }
}
