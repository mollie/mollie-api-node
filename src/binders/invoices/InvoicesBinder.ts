import { type InvoiceData } from '../../data/invoices/data';
import type Invoice from '../../data/invoices/Invoice';
import type Page from '../../data/page/Page';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import alias from '../../plumbing/alias';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'invoices';

export default class InvoicesBinder extends Binder<InvoiceData, Invoice> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    alias(this, { page: ['all', 'list'] });
  }

  /**
   * Retrieve a single invoice by its ID.
   *
   * @since 4.6.0
   * @see https://docs.mollie.com/reference/get-invoice
   */
  public get(id: string): Promise<Invoice>;
  public get(id: string, callback: Callback<Invoice>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'invoice');
    return this.networkClient.get<InvoiceData, Invoice>(`${pathSegment}/${id}`);
  }

  /**
   * Retrieve all invoices on the organization, ordered from newest to oldest.
   *
   * The results are paginated.
   *
   * @since 4.6.0
   * @see https://docs.mollie.com/reference/list-invoices
   */
  public page(parameters?: PageParameters): Promise<Page<Invoice>>;
  public page(parameters: PageParameters, callback: Callback<Page<Invoice>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient.page<InvoiceData, Invoice>(pathSegment, 'invoices', parameters).then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Retrieve all invoices on the organization, ordered from newest to oldest.
   *
   * The results are paginated.
   *
   * @since 4.6.0
   * @see https://docs.mollie.com/reference/list-invoices
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<InvoiceData, Invoice>(pathSegment, 'invoices', query, valuesPerMinute);
  }
}
