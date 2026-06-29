import type Nullable from '../../types/Nullable';
import type Seal from '../../types/Seal';
import { type Amount, type Links, type Url } from '../global';
import type Model from '../Model';
import type SettlementHelper from './SettlementHelper';

export interface SettlementData extends Model<'settlement'> {
  /**
   * The settlement's bank reference, as found in your Mollie account and on your bank statement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=reference#response
   */
  reference: string;
  /**
   * The date on which the settlement was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date on which the settlement was settled, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. When requesting the open settlement or next settlement the return value is `null`.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=settledAt#response
   */
  settledAt: Nullable<string>;
  /**
   * The status of the settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=status#response
   */
  status: SettlementStatus;
  /**
   * The total amount paid out with this settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=amount#response
   */
  amount: Amount;
  /**
   * The balance token that the settlement was settled to.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=balanceId#response
   */
  balanceId: string;
  /**
   * The ID of the oldest invoice created for all the periods, if the invoice has been created yet.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=invoiceId#response
   */
  invoiceId?: string;
  /**
   * For bookkeeping purposes, the settlement includes an overview of transactions included in the settlement. These transactions are grouped into 'period' objects — one for each calendar month.
   *
   * For example, if a settlement includes funds from 15 April until 4 May, it will include two period objects. One for all transactions processed between 15 April and 30 April, and one for all transactions between 1 May and 4 May.
   *
   * Period objects are grouped by year, and then by month. So in the above example, the full `periods` collection will look as follows: `{"2024": {"04": {...}, "05": {...}}}`. The year and month in this documentation are referred as `<year>` and `<month>`.
   *
   * The example response should give a good idea of what this looks like in practise.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=periods#response
   */
  periods: Record<string, Record<string, Period>>;
  /**
   * An object with several URL objects relevant to the settlement. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links#response
   */
  _links: SettlementLinks;
}

export type Settlement = Seal<SettlementData, SettlementHelper>;

interface Period {
  /**
   * An array of revenue objects containing the total revenue for each payment method during this period. Each object has the following fields.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=periods/revenue#response
   */
  revenue: Array<{ description: string; method: string; count: number; amountNet: Amount; amountVat: Amount; amountGross: Amount }>;
  /**
   * An array of Cost objects, describing the fees withheld for each payment method during this period. Each object has the following fields.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=periods/costs#response
   */
  costs: Array<{ description: string; method: string; count: number; rate: { fixed: Amount; variable: string }; amountNet: Amount; amountVat: Amount; amountGross: Amount }>;
  /**
   * The ID of the invoice that was created to invoice specifically the costs in this month/period.
   *
   * If an individual month/period has not been invoiced yet, then this field will not be present until that invoice is created.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=periods/invoiceId#response
   */
  invoiceId: string;
  /**
   * The invoice reference, if the invoice has been created already.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=periods/invoiceReference#response
   */
  invoiceReference?: string;
}

interface SettlementLinks extends Links {
  /**
   * The API resource URL of the payments that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links/payments#response
   */
  payments: Url;
  /**
   * The API resource URL of the refunds that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links/refunds#response
   */
  refunds: Url;
  /**
   * The API resource URL of the chargebacks that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links/chargebacks#response
   */
  chargebacks: Url;
  /**
   * The API resource URL of the captures that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links/captures#response
   */
  captures: Url;
  /**
   * The API resource URL of the invoice that contains this settlement, if an invoice has been created for it. Omitted for the open and next settlements.
   *
   * @see https://docs.mollie.com/reference/get-settlement?path=_links/invoice#response
   */
  invoice?: Url;
}

export enum SettlementStatus {
  /**
   * The settlement has not been closed yet.
   */
  open = 'open',
  /**
   * The settlement has been closed and is being processed.
   */
  pending = 'pending',
  /**
   * The settlement is being processed by the bank.
   */
  processingAtBank = 'processing-at-bank',
  /**
   * The settlement has been paid out.
   */
  paidout = 'paidout',
  /**
   * The settlement could not be paid out.
   */
  failed = 'failed',
}
