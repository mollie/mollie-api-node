import { type Amount, type Links, type Url } from '../global';
import type Model from '../Model';

export interface InvoiceData extends Model<'invoice'> {
  /**
   * The reference number of the invoice. An example value would be `2018.10000`.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=reference#response
   */
  reference: string;
  /**
   * The VAT number to which the invoice was issued to, if applicable.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=vatNumber#response
   */
  vatNumber?: string;
  /**
   * Status of the invoice.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=status#response
   */
  status: InvoiceStatus;
  /**
   * The total amount of the invoice excluding VAT, e.g. `100.00`.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=netAmount#response
   */
  netAmount: Amount;
  /**
   * The VAT amount of the invoice. Only applicable for merchants registered in the Netherlands. For EU merchants, VAT
   * will be shifted to recipient; article 44 and 196 EU VAT Directive 2006/112. For merchants outside the EU, no VAT
   * will be charged.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=vatAmount#response
   */
  vatAmount: Amount;
  /**
   * The total amount of the invoice including VAT.
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
   * The date on which the invoice was issued, in `YYYY-MM-DD` format.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=issuedAt#response
   */
  issuedAt: string;
  /**
   * The date on which the invoice was paid, in `YYYY-MM-DD` format. Only available if the invoice is `paid`.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=paidAt#response
   */
  paidAt?: string;
  /**
   * The date on which the invoice is due, in `YYYY-MM-DD` format. Only available if the invoice is not `paid` yet.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=dueAt#response
   */
  dueAt?: string;
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
   * A description of the product, for example `iDEAL transaction costs`.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/description#response
   */
  description: string;
  /**
   * The number of products invoiced, for example the number of payments in case of transaction costs.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/count#response
   */
  count: number;
  /**
   * The VAT percentage rate that applies to this product.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/vatPercentage#response
   */
  vatPercentage: number;
  /**
   * The price of a single product, excluding VAT.
   *
   * @see https://docs.mollie.com/reference/get-invoice?path=lines/amount#response
   */
  amount: Amount;
}

export interface InvoiceLinks extends Links {
  /**
   * The URL to the PDF version of the invoice. Only available if the invoice has been generated.
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
