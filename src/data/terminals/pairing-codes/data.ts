import type Model from '../../Model';
import type Nullable from '../../../types/Nullable';
import { type ApiMode, type Links, type Url } from '../../global';

export interface TerminalPairingCodeData extends Model<'terminal-pairing-code'> {
  /**
   * Whether this entity was created in live mode or in test mode.
   *
   * Possible values: `live` `test`
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=mode#response
   */
  mode: ApiMode;
  /**
   * The human-readable pairing code to be entered on the terminal. This code is multi-use and will expire after the time indicated in `expiresAt`.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=code#response
   */
  code: string;
  /**
   * The ID of the profile the terminal is being paired with.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=profileId#response
   */
  profileId: string;
  /**
   * The status of the pairing code.
   *
   * Possible values: `active` `expired` `revoked`
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=status#response
   */
  status: PairingCodeStatus;
  /**
   * Additional pairing code data, present only when requested via the `include` parameter.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=details#response
   */
  details?: {
    /**
     * The QR code representation of the pairing code.
     */
    qrCode?: {
      height: number;
      width: number;
      src: string;
    };
  };
  /**
   * The date and time the pairing code expires, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Pairing codes expire 90 days after creation. After this time, the code can no longer be used to pair a terminal.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=expiresAt#response
   */
  expiresAt: string;
  /**
   * The date and time the pairing code was revoked, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. `null` if the code has not been revoked.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=revokedAt#response
   */
  revokedAt: Nullable<string>;
  /**
   * The date and time the pairing code was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code?path=createdAt#response
   */
  createdAt: string;
  _links: Links & {
    /**
     * A link to the profile resource that the terminal will be paired with.
     */
    profile: Url;
  };
}

export enum PairingCodeStatus {
  active = 'active',
  expired = 'expired',
  revoked = 'revoked',
}

export enum TerminalPairingCodeInclude {
  qrCode = 'details.qrCode',
}
