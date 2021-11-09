import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Callback from '../../types/Callback';
import Helper from '../Helper';
import Organization, { OrganizationData } from '../organizations/Organizations';
import { OnboardingData, OnboardingStatus } from './data';
import Onboarding from './Onboarding';

export default class OnboardingHelper extends Helper<OnboardingData, Onboarding> {
  constructor(networkClient: TransformingNetworkClient, protected readonly links: OnboardingData['_links']) {
    super(networkClient, links);
  }

  /**
   * @deprecated Use `onboarding.status == OnboardingStatus.needsData` instead.
   */
  public needsData(this: OnboardingData) {
    return this.status == OnboardingStatus.needsData;
  }

  /**
   * @deprecated Use `onboarding.status == OnboardingStatus.inReview` instead.
   */
  public isInReview(this: OnboardingData) {
    return this.status == OnboardingStatus.inReview;
  }

  /**
   * @deprecated Use `onboarding.status == OnboardingStatus.completed` instead.
   */
  public isCompleted(this: OnboardingData) {
    return this.status == OnboardingStatus.completed;
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
