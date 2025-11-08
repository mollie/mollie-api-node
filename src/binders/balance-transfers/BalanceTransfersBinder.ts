import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type BalanceTransfer from '../../data/balance-transfers/BalanceTransfer';
import { type BalanceTransferData } from '../../data/balance-transfers/data';
import type Page from '../../data/page/Page';
import alias from '../../plumbing/alias';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type CreateParameters, type GetParameters, type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'connect/balance-transfers';

export default class BalanceTransfersBinder extends Binder<BalanceTransferData, BalanceTransfer> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Create a balance transfer from your organization's balance to a connected organization's balance, or vice versa.
   * You can also create a balance transfer between two connected organizations.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer
   */
  public create(parameters: CreateParameters): Promise<BalanceTransfer>;
  public create(parameters: CreateParameters, callback: Callback<BalanceTransfer>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    return this.networkClient.post<BalanceTransferData, BalanceTransfer>(pathSegment, parameters);
  }

  /**
   * Retrieve a single Connect balance transfer object by its ID.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/get-connect-balance-transfer
   */
  public get(id: string, parameters?: GetParameters): Promise<BalanceTransfer>;
  public get(id: string, parameters: GetParameters, callback: Callback<BalanceTransfer>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'balance-transfer');
    return this.networkClient.get<BalanceTransferData, BalanceTransfer>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Retrieve all Connect balance transfers.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/list-connect-balance-transfers
   */
  public page(parameters?: PageParameters): Promise<Page<BalanceTransfer>>;
  public page(parameters: PageParameters, callback: Callback<Page<BalanceTransfer>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<BalanceTransferData, BalanceTransfer>(pathSegment, 'connect-balance-transfers', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all Connect balance transfers.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/list-connect-balance-transfers
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<BalanceTransferData, BalanceTransfer>(pathSegment, 'connect-balance-transfers', query, valuesPerMinute);
  }
}
