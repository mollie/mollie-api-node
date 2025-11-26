import { type CapabilityData } from '../capabilities/data';
import { type Links, type Url } from '../global';
import type Model from '../Model';
import { type OnboardingData } from '../onboarding/data';
import { type OrganizationData } from '../organizations/Organizations';

/**
 * Client data representing a Mollie organization connected to a partner account.
 *
 * @see https://docs.mollie.com/reference/get-client
 */
export interface ClientData extends Model<'client'> {
  /**
   * The commission object, if applicable.
   *
   * @see https://docs.mollie.com/reference/get-client?path=commission#response
   */
  commission?: Commission;
  /**
   * The date and time the client organization was created, in ISO 8601 format.
   *
   * @see https://docs.mollie.com/reference/get-client?path=organizationCreatedAt#response
   */
  organizationCreatedAt: string;
  /**
   * An object with several relevant URLs.
   *
   * @see https://docs.mollie.com/reference/get-client?path=_links#response
   */
  _links: ClientLinks;
  /**
   * Embedded resources, if requested via the `embed` query parameter.
   *
   * @see https://docs.mollie.com/reference/get-client?path=_embedded#response
   */
  _embedded?: {
    organization?: Omit<OrganizationData, '_embedded'>;
    onboarding?: Omit<OnboardingData, '_embedded'>;
    capabilities?: Omit<CapabilityData, '_embedded'>[];
  };
}

export interface ClientLinks extends Links {
  /**
   * The API resource URL of the client's organization.
   *
   * @see https://docs.mollie.com/reference/get-client?path=_links/organization#response
   */
  organization: Url;
  /**
   * The API resource URL of the client's onboarding status.
   *
   * @see https://docs.mollie.com/reference/get-client?path=_links/onboarding#response
   */
  onboarding: Url;
}

/**
 * Commission information for a client.
 *
 * @see https://docs.mollie.com/reference/get-client
 */
export interface Commission {
  /**
   * The commission count.
   *
   * @see https://docs.mollie.com/reference/get-client?path=commission/count#response
   */
  count: number;
}

/**
 * Embed options for the Clients API.
 *
 * @see https://docs.mollie.com/reference/get-client
 */
export enum ClientEmbed {
  organization = 'organization',
  onboarding = 'onboarding',
  capabilities = 'capabilities',
}
