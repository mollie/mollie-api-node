import { type Amount, type ApiMode, type Links } from '../global';
import type Model from '../Model';

export interface BalanceTransferData extends Model<'connect-balance-transfer'> {
  /**
   * The amount to be transferred.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=amount#body-params
   */
  amount: Amount;
  /**
   * A party involved in the balance transfer (sender).
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=source#body-params
   */
  source: BalanceTransferParty;
  /**
   * A party involved in the balance transfer (receiver).
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=destination#body-params
   */
  destination: BalanceTransferParty;
  /**
   * The transfer description for initiating party.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=description#body-params
   */
  description: string;
  /**
   * The status of the transfer.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=status#response
   */
  status: BalanceTransferStatus;
  /**
   * The reason for the current status of the transfer, if applicable.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=statusReason#response
   */
  statusReason?: BalanceTransferStatusReason;
  /**
   * The type of the transfer. Different fees may apply to different types of transfers.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=category#body-params
   */
  category?: BalanceTransferCategory;
  /**
   * The entity's date and time of creation, in ISO 8601 format.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date and time when the transfer was completed, in ISO 8601 format.
   * This parameter is omitted if the transfer is not executed (yet).
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=executedAt#response
   */
  executedAt?: string;
  /**
   * Whether this entity was created in live mode or in test mode.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=mode#response
   */
  mode: ApiMode;
  /**
   * An object with several relevant URLs.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=_links#response
   */
  _links: Links;
}

export interface BalanceTransferParty {
  /**
   * Defines the type of the party. At the moment, only `organization` is supported.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=source/type#body-params
   */
  type: 'organization';
  /**
   * Identifier of the party. For example, this contains the organization token if the type is `organization`.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=source/id#body-params
   */
  id: string;
  /**
   * The transfer description for the transfer party. This is the description that will appear in the financial reports of the party.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=source/description#body-params
   */
  description: string;
}

export interface BalanceTransferStatusReason {
  /**
   * A machine-readable code that indicates the reason for the transfer's status.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=statusReason/code#response
   */
  code: BalanceTransferStatusReasonCode;
  /**
   * A description of the status reason, localized according to the transfer.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=statusReason/message#response
   */
  message: string;
}

export enum BalanceTransferStatus {
  created = 'created',
  failed = 'failed',
  succeeded = 'succeeded',
}

export enum BalanceTransferStatusReasonCode {
  request_created = 'request_created',
  success = 'success',
  source_not_allowed = 'source_not_allowed',
  destination_not_allowed = 'destination_not_allowed',
  insufficient_funds = 'insufficient_funds',
  invalid_source_balance = 'invalid_source_balance',
  invalid_destination_balance = 'invalid_destination_balance',
  transfer_request_expired = 'transfer_request_expired',
  transfer_limit_reached = 'transfer_limit_reached',
}

export enum BalanceTransferCategory {
  invoice_collection = 'invoice_collection',
  purchase = 'purchase',
  chargeback = 'chargeback',
  refund = 'refund',
  service_penalty = 'service_penalty',
  discount_compensation = 'discount_compensation',
  manual_correction = 'manual_correction',
  other_fee = 'other_fee',
}
