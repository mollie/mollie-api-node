import { type Links } from '../global';
import type Model from '../Model';

export interface TerminalData extends Model<'terminal'> {
  /**
   * The profile the terminal is registered on, for example `pfl_v9hTwCvYqw`.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=profileId#response
   */
  profileId: string;
  /**
   * The status of the Terminal.
   *
   * Possible values:
   * -   `pending`  The terminal device has been linked to your account, but has not yet been activated.
   *                This is the first state that the terminal gets, as soon as it’s ordered from us and assigned to your account.
   * -   `active`   The terminal is fully configured and ready to accept payments.
   *                As soon as we configure the terminal for you, it will be moved to this state.
   * -   `inactive` The terminal has been deactivated, which can mean that you returned the device to us,
   *                or you requested to move it to another profile or organization.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=status#response
   */
  status: 'pending' | 'active' | 'inactive';
  /**
   * The brand of the terminal. For example, ‘PAX’.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=brand#response
   */
  brand: string;
  /**
   * The model of the terminal. For example for a PAX A920, this field’s value will be ‘A920’.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=model#response
   */
  model: string;
  /**
   * The serial number of the terminal. The serial number is provided at terminal creation time.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=serialNumber#response
   */
  serialNumber: string;
  /**
   * The currency which is set for the terminal, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format.
   * Please take into consideration that currently our terminals are bound to a specific currency, chosen during setup.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=currency#response
   */
  currency: string;
  /**
   * A short description of the terminal. The description can be used as an identifier for the terminal.
   * Currently, the description is set when the terminal is initially configured. It will be visible in the dashboard as well as on the device itself.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=description#response
   */
  description: string;
  /**
   * The date on which the terminal was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=createdAt#response
   */
  createdAt: string;
  /**
   * The date on which the terminal had its last status change, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=createdAt#response
   */
  updatedAt: string;
  /**
   * An object with several URL objects relevant to the terminal. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal?path=_links#response
   */
  _links: TerminalLinks;
}

type TerminalLinks = Links;
