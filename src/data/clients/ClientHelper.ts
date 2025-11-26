import breakUrl from '../../communication/breakUrl';
import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import renege from '../../plumbing/renege';
import resolveIf from '../../plumbing/resolveIf';
import type Callback from '../../types/Callback';
import type Capability from '../capabilities/Capability';
import Helper from '../Helper';
import type Onboarding from '../onboarding/Onboarding';
import { type OnboardingData } from '../onboarding/data';
import type Organization from '../organizations/Organizations';
import { type OrganizationData } from '../organizations/Organizations';
import type Client from './Client';
import { type ClientData } from './data';

export default class ClientHelper extends Helper<ClientData, Client> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: ClientData['_links'],
    protected readonly embedded: Client['_embedded'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the organization of the client, if embedded.
   * Otherwise fetches it from the API.
   *
   * @since 4.4.0
   */
  public getOrganization(): Promise<Organization>;
  public getOrganization(callback: Callback<Organization>): void;
  public getOrganization() {
    if (renege(this, this.getOrganization, ...arguments)) return;
    return resolveIf(this.embedded?.organization) ?? this.networkClient.get<OrganizationData, Organization>(...breakUrl(this.links.organization.href));
  }

  /**
   * Returns the onboarding status of the client, if embedded.
   * Otherwise fetches it from the API.
   *
   * @since 4.4.0
   */
  public getOnboarding(): Promise<Onboarding>;
  public getOnboarding(callback: Callback<Onboarding>): void;
  public getOnboarding() {
    if (renege(this, this.getOnboarding, ...arguments)) return;
    return resolveIf(this.embedded?.onboarding) ?? this.networkClient.get<OnboardingData, Onboarding>(...breakUrl(this.links.onboarding.href));
  }

  /**
   * Returns the capabilities of the client organization, if embedded.
   *
   * Note: Unlike organization and onboarding, client-specific capabilities can only
   * be retrieved via embedding. The Capabilities API (`/v2/capabilities`) returns
   * capabilities for the authenticated organization, not for a specific client.
   *
   * @since 4.4.0
   */
  public getCapabilities(): Capability[] | undefined {
    return this.embedded?.capabilities;
  }
}
