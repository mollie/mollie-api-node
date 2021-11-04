import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Helper from '../Helper';
import Organization, { OrganizationData } from '../organizations/Organizations';
import { OnboardingData } from './data';
import Onboarding from './Onboarding';

export default class OnboardingHelper extends Helper<OnboardingData, Onboarding> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: OnboardingData['_links']) {
    super(networkClient, links);
  }

  public needsData(this: OnboardingData) {
    return this.status == 'needs-data';
  }

  public isInReview(this: OnboardingData) {
    return this.status == 'in-review';
  }

  public isCompleted(this: OnboardingData) {
    return this.status == 'completed';
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
