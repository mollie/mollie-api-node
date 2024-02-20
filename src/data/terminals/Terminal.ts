import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import Helper from "../Helper";
import type Model from '../Model';
import {Links} from "../global";

export interface TerminalData extends Model<'terminal'> {
  /**
   * The identifier used for referring to the profile the terminal was created on. For example, pfl_QkEhN94Ba.
   */
  profileId: string
  /**
   * The terminal's status. Refer to the documentation regarding statuses for more info about which statuses occur at what point.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal#response
   */
  status: TerminalStatus
  /**
   * The brand of the terminal. For example, ‘PAX’.
   */
  brand: string
  /**
   * The model of the terminal. For example for a PAX A920, this field’s value will be ‘A920’.
   */
  model: string
  /**
   * The serial number of the terminal. The serial number is provided at terminal creation time.
   */
  serialNumber: string
  /**
   * The currency which is set for the terminal, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. Please take into consideration that currently our terminals are bound to a specific currency, chosen during setup.
   */
  currency?: string
  /**
   * A short description of the terminal. The description can be used as an identifier for the terminal. Currently, the description is set when the terminal is initially configured. It will be visible in the dashboard as well as on the device itself.
   */
  description: string
  /**
   * The date and time the terminal was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   */
  createdAt: string
  /**
   * The date and time the terminal was last updated, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   */
  updatedAt: string
  _links: Links
}

export enum TerminalStatus {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive'
}

type Terminal = Seal<TerminalData, Helper<TerminalData, Terminal>>;

export default Terminal;

export function transform(networkClient: TransformingNetworkClient, input: TerminalData): Terminal {
  return Object.assign(Object.create(new Helper(networkClient, input._links)), input);
}
