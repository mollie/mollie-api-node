import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import breakUrl from '../../../communication/breakUrl';
import renege from '../../../plumbing/renege';
import type Callback from '../../../types/Callback';
import Helper from '../../Helper';
import type Profile from '../../profiles/Profile';
import { type ProfileData } from '../../profiles/data';
import { type TerminalPairingCodeData } from './data';
import type TerminalPairingCode from './TerminalPairingCode';

export default class TerminalPairingCodeHelper extends Helper<TerminalPairingCodeData, TerminalPairingCode> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: TerminalPairingCodeData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the profile the terminal is being paired with.
   */
  public getProfile(): Promise<Profile>;
  public getProfile(callback: Callback<Profile>): void;
  public getProfile() {
    if (renege(this, this.getProfile, ...arguments)) return;
    return this.networkClient.get<ProfileData, Profile>(...breakUrl(this.links.profile.href));
  }
}
