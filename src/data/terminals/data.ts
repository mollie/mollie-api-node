import type Model from '../Model';
import { Links } from '../global';

export interface TerminalData extends Model<'terminal'> {
  /**
   * A short description of the terminal. The description can be used as an identifier for the terminal. Currently, the description is set when the terminal is initially configured. It will be visible in the Mollie Dashboard, and it may be visible on the device itself depending on the device.
   */
  description: string;
  /**
   * The terminal's status. Refer to the documentation regarding statuses for more info about which statuses occur at what point.
   *
   * @see https://docs.mollie.com/reference/v2/terminals-api/get-terminal#response
   */
  status: TerminalStatus;
  /**
   * The brand of the terminal. For example, ‘PAX’.
   */
  brand?: string;
  /**
   * The model of the terminal. For example for a PAX A920, this field’s value will be ‘A920’.
   */
  model?: string;
  /**
   * The serial number of the terminal. The serial number is provided at terminal creation time.
   */
  serialNumber?: string;
  /**
   * The currency which is set for the terminal, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. Please take into consideration that currently our terminals are bound to a specific currency, chosen during setup.
   */
  currency?: string;
  /**
   * The identifier used for referring to the profile the terminal was created on. For example, pfl_QkEhN94Ba.
   */
  profileId?: string;
  /**
   * The date and time the terminal was created, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   */
  createdAt: string;
  _links: Links;
}

export enum TerminalStatus {
  /**
   * The device has been linked to your account, but has not yet been activated. If you ordered a terminal from us, it may already become visible in your account with this status.
   */
  pending = 'pending',
  /**
   * The terminal is fully configured and ready to accept payments.
   */
  active = 'active',
  /**
   * The terminal has been deactivated. Deactivation happens for example if you returned the device to Mollie, or if you requested to move it to another profile or organization.
   */
  inactive = 'inactive',
}
