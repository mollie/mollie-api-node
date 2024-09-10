import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Helper from '../Helper';
import type Organization from '../organizations/Organizations';
import { type OrganizationData } from '../organizations/Organizations';
import { OnboardingStatus, type OnboardingData } from './data';
import type Onboarding from './Onboarding';

export default class OnboardingHelper extends Helper<OnboardingData, Onboarding> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: OnboardingData['_links']) {
    super(networkClient, links);
  }

  /**
   * Returns the organization.
   *
   * @since 3.6.0
   */
  public getOrganization(): Promise<Organization>;
  public getOrganization(callback: Callback<Organization>): void;
  public getOrganization() {
    if (renege(this, this.getOrganization, ...arguments)) return;
    return this.networkClient.get<OrganizationData, Organization>(this.links.organization.href);
  }
}
