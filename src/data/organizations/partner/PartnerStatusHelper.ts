import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import Helper from '../../Helper';
import type PartnerStatus from './PartnerStatus';
import type { PartnerStatusData } from './data';

export default class PartnerStatusHelper extends Helper<PartnerStatusData, PartnerStatus> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: PartnerStatusData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the signup link URL for this partner, if available.
   * Only present for partners of type "signuplink".
   */
  public getSignupLink(): string | undefined {
    return this.links.signuplink?.href;
  }
}
