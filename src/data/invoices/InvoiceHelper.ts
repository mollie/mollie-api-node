import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Nullable from '../../types/Nullable';
import Helper from '../Helper';
import { type InvoiceData } from './data';
import type Invoice from './Invoice';

export default class InvoiceHelper extends Helper<InvoiceData, Invoice> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: InvoiceData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the URL to the PDF version of the invoice, or `null` if it is not available.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=_links/pdf#response
   */
  public getPdfUrl(): Nullable<string> {
    return this.links.pdf?.href ?? null;
  }
}
