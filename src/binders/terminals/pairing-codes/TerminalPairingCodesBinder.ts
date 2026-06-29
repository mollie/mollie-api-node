import { runIf } from 'ruply';
import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Page from '../../../data/page/Page';
import { type TerminalPairingCodeData } from '../../../data/terminals/pairing-codes/data';
import type TerminalPairingCode from '../../../data/terminals/pairing-codes/TerminalPairingCode';
import assertWellFormedId from '../../../plumbing/assertWellFormedId';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Binder from '../../Binder';
import { type CreateParameters, type GetParameters, type IterateParameters, type PageParameters } from './parameters';

const pathSegment = 'terminals/pairing-codes';

export default class TerminalPairingCodesBinder extends Binder<TerminalPairingCodeData, TerminalPairingCode> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Request a pairing code to onboard a point-of-sale terminal.
   *
   * The response includes a human-readable `code` for manual entry on the terminal, and a QR code as a base64 encoded SVG data URI for scanning if you specify the `include` parameter with value `details.qrCode`.
   *
   * Pairing codes expire after 90 days (see `expiresAt`) and can be used multiple times.
   *
   * This endpoint currently does not support test mode yet.
   *
   * @see https://docs.mollie.com/reference/terminals-request-pairing-code
   */
  public create(parameters: CreateParameters): Promise<TerminalPairingCode>;
  public create(parameters: CreateParameters, callback: Callback<TerminalPairingCode>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const { include, ...data } = parameters;
    const query = runIf(include, include => ({ include }));
    return this.networkClient.post<TerminalPairingCodeData, TerminalPairingCode>(pathSegment, data, query);
  }

  /**
   * Get a pairing code to onboard a point-of-sale terminal.
   *
   * The response includes a human-readable `code` for manual entry on the terminal and, optionally, a QR code as a base64 encoded SVG data URI when you use the `include` parameter with value `details.qrCode`.
   *
   * This endpoint currently does not support test mode yet.
   *
   * @see https://docs.mollie.com/reference/terminals-get-pairing-code
   */
  public get(id: string, parameters?: GetParameters): Promise<TerminalPairingCode>;
  public get(id: string, parameters: GetParameters, callback: Callback<TerminalPairingCode>): void;
  public get(id: string, parameters?: GetParameters) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'terminal-pairing-code');
    return this.networkClient.get<TerminalPairingCodeData, TerminalPairingCode>(`${pathSegment}/${id}`, parameters);
  }

  /**
   * Returns all pairing codes: `active`, `expired`, and `revoked`.
   *
   * The results are paginated. See pagination for more information.
   *
   * This endpoint currently does not support test mode yet.
   *
   * @see https://docs.mollie.com/reference/terminals-list-pairing-codes
   */
  public page(parameters?: PageParameters): Promise<Page<TerminalPairingCode>>;
  public page(parameters: PageParameters, callback: Callback<Page<TerminalPairingCode>>): void;
  public page(parameters: PageParameters = {}) {
    if (renege(this, this.page, ...arguments)) return;
    return this.networkClient
      .page<TerminalPairingCodeData, TerminalPairingCode>(pathSegment, 'terminal-pairing-codes', parameters)
      .then(result => this.injectPaginationHelpers(result, this.page, parameters));
  }

  /**
   * Returns all pairing codes: `active`, `expired`, and `revoked`.
   *
   * The results are paginated. See pagination for more information.
   *
   * This endpoint currently does not support test mode yet.
   *
   * @see https://docs.mollie.com/reference/terminals-list-pairing-codes
   */
  public iterate(parameters?: IterateParameters) {
    const { valuesPerMinute, ...query } = parameters ?? {};
    return this.networkClient.iterate<TerminalPairingCodeData, TerminalPairingCode>(pathSegment, 'terminal-pairing-codes', query, valuesPerMinute);
  }

  /**
   * Revoke a pairing code, preventing the onboarding of new point-of-sale terminals.
   *
   * Terminals that have already paired with this code are not affected.
   *
   * This endpoint currently does not support test mode yet.
   *
   * @see https://docs.mollie.com/reference/terminals-revoke-pairing-code
   */
  public revoke(id: string): Promise<TerminalPairingCode>;
  public revoke(id: string, callback: Callback<TerminalPairingCode>): void;
  public revoke(id: string) {
    if (renege(this, this.revoke, ...arguments)) return;
    assertWellFormedId(id, 'terminal-pairing-code');
    return this.networkClient.delete<TerminalPairingCodeData, TerminalPairingCode>(`${pathSegment}/${id}`);
  }
}
