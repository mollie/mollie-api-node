import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Client from '../../data/clients/Client';
import { type ClientData } from '../../data/clients/data';
import type Page from '../../data/page/Page';
import alias from '../../plumbing/alias';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type GetParameters, type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'clients';

export default class ClientsBinder extends Binder<ClientData, Client> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Retrieve a single client by its ID.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/get-client
   */
  public get(id: string, parameters?: GetParameters): Promise<Client>;
  public get(id: string, parameters: GetParameters, callback: Callback<Client>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'organization');
    return this.networkClient.get<ClientData, Client>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve a list of all clients linked to your partner account.
   *
   * The results are paginated.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/list-clients
   */
  public page(parameters?: PageParameters): Promise<Page<Client>>;
  public page(parameters: PageParameters, callback: Callback<Page<Client>>): void;
  public page(parameters?: PageParameters) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<ClientData, Client>(pathSegment, 'clients', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve a list of all clients linked to your partner account.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/list-clients
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<ClientData, Client>(pathSegment, 'clients', query, valuesPerMinute);
  }
}
