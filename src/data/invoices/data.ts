import type Nullable from '../../types/Nullable';
import { type Amount, type Links, type Url } from '../global';
import type Model from '../Model';

export interface InvoiceData extends Model<'invoice'> {
  /**
   * The reference number of the invoice. An example value would be: `2024.10000`.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=reference#response
   */
  reference: string;
  /**
   * The VAT number to which the invoice was issued to, if applicable.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=vatNumber#response
   */
  vatNumber?: Nullable<string>;
  /**
   * Status of the invoice.
   *
   * Possible values: `open` `paid` `overdue`
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=status#response
   */
  status: InvoiceStatus;
  /**
   * Total amount of the invoice, excluding VAT.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=netAmount#response
   */
  netAmount: Amount;
  /**
   * VAT amount of the invoice. Only applicable to merchants registered in the Netherlands. For EU merchants, VAT will be
   * shifted to the recipient (as per article 44 and 196 in the EU VAT Directive 2006/112). For merchants outside the EU,
   * no VAT will be charged.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=vatAmount#response
   */
  vatAmount: Amount;
  /**
   * Total amount of the invoice, including VAT.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=grossAmount#response
   */
  grossAmount: Amount;
  /**
   * The collection of products which make up the invoice.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines#response
   */
  lines: InvoiceLine[];
  /**
   * The invoice date in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=issuedAt#response
   */
  issuedAt: string;
  /**
   * The date on which the invoice was paid, if applicable, in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=paidAt#response
   */
  paidAt?: Nullable<string>;
  /**
   * The date on which the invoice is due, if applicable, in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=dueAt#response
   */
  dueAt?: Nullable<string>;
  /**
   * An object with several relevant URLs. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=_links#response
   */
  _links: InvoiceLinks;
}

export interface InvoiceLine {
  /**
   * The administrative period in `YYYY-MM` on which the line should be booked.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/period#response
   */
  period: string;
  /**
   * Description of the product.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/description#response
   */
  description: string;
  /**
   * Number of products invoiced. For example, the number of payments.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/count#response
   */
  count: number;
  /**
   * VAT percentage rate that applies to this product.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/vatPercentage#response
   */
  vatPercentage: number;
  /**
   * Line item amount excluding VAT.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/amount#response
   */
  amount: Amount;
}

export interface InvoiceLinks extends Links {
  /**
   * URL to a downloadable PDF of the invoice.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=_links/pdf#response
   */
  pdf?: Url;
}

export enum InvoiceStatus {
  open = 'open',
  paid = 'paid',
  overdue = 'overdue',
}
