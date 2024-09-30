import type Nullable from '../../types/Nullable';
import type Seal from '../../types/Seal';
import { type Amount, type Links, type Url } from '../global';
import type Model from '../Model';
import type SettlementHelper from './SettlementHelper';

export interface SettlementData extends Model<'settlement'> {
  /**
   * The settlement's bank reference, as found in your Mollie account and on your bank statement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=reference#response
   */
  reference: string;
  /**
   * The date on which the settlement was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date on which the settlement was settled, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. When requesting the open settlement or next settlement the return value is `null`.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=settledAt#response
   */
  settledAt: Nullable<string>;
  /**
   * The status of the settlement.
   *
   * Possible values:
   *
   * -   `open` The settlement has not been closed yet.
   * -   `pending` The settlement has been closed and is being processed.
   * -   `paidout` The settlement has been paid out.
   * -   `failed` The settlement could not be paid out.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=status#response
   */
  status: 'open' | 'pending' | 'paidout' | 'failed';
  /**
   * The total amount paid out with this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=amount#response
   */
  amount: Amount;
  /**
   * The total amount paid out with this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=amount#response
   */
  periods: Record<string, Record<string, Period>>;
  /**
   * An object with several URL objects relevant to the settlement. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links#response
   */
  _links: SettlementLinks;
}

export type Settlement = Seal<SettlementData, SettlementHelper>;

interface Period {
  /**
   * An array of revenue objects containing the total revenue for each payment method during this period. Each object has the following fields.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=periods/revenue#response
   */
  revenue: Array<{ description: string; method: string; count: number; amountNet: Amount; amountVat: Amount; amountGross: Amount }>;
  /**
   * An array of Cost objects, describing the fees withheld for each payment method during this period. Each object has the following fields.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=periods/costs#response
   */
  costs: Array<{ description: string; method: string; count: number; rate: { fixed: Amount; variable: string }; amountNet: Amount; amountVat: Amount; amountGross: Amount }>;
  /**
   * The ID of the invoice that was created to invoice specifically the costs in this month/period.
   *
   * If an individual month/period has not been invoiced yet, then this field will not be present until that invoice is created.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=periods/invoiceId#response
   */
  invoiceId: string;
}

interface SettlementLinks extends Links {
  /**
   * The API resource URL of the payments that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links/payments#response
   */
  payments: Url;
  /**
   * The API resource URL of the refunds that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links/refunds#response
   */
  refunds: Url;
  /**
   * The API resource URL of the chargebacks that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links/chargebacks#response
   */
  chargebacks: Url;
  /**
   * The API resource URL of the captures that are included in this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links/captures#response
   */
  captures: Url;
  /**
   * The API resource URL of the invoice that contains this settlement.
   *
   * @see https://docs.mollie.com/reference/v2/settlements-api/get-settlement?path=_links/invoice#response
   */
  invoice: Url;
}
