import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Page from '../../data/page/Page';
import { type TerminalData } from '../../data/terminals/data';
import type Terminal from '../../data/terminals/Terminal';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'terminals';

export default class TerminalsBinder extends Binder<TerminalData, Terminal> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * @since 3.7.1
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal
   */
  public get(id: string): Promise<Terminal>;
  public get(id: string, callback: Callback<Terminal>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    return this.networkClient.get<TerminalData, Terminal>(`${pathSegment}/${id}`);
  }

  /**
   * @since 3.7.1
   * @see https://docs.mollie.com/reference/v2/terminals-api/list-terminals
   */
  public page(parameters?: PageParameters): Promise<Page<Terminal>>;
  public page(parameters: PageParameters, callback: Callback<Page<Terminal>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<TerminalData, Terminal>(pathSegment, 'terminals', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * @since 3.7.1
   * @see https://docs.mollie.com/reference/v2/terminals-api/list-terminals
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<TerminalData, Terminal>(pathSegment, 'terminals', query, valuesPerMinute);
  }
}
