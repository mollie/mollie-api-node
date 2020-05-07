import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import checkId from '../../plumbing/checkId';
import Organization, { injectPrototypes, OrganizationData } from '../../data/organizations/Organizations';
import Resource from '../Resource';
import renege from '../../plumbing/renege';

/**
 * @since 3.2.0
 */
export default class OrganizationsResource extends Resource<OrganizationData, Organization> {
  protected getResourceUrl(): string {
    return 'organizations';
  }

  protected injectPrototypes = injectPrototypes;

  /**
   * Retrieve an organization by its ID.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization
   */
  public get(id: string): Promise<Organization>;
  public get(id: string, callback: Callback<Organization>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'organization')) {
      throw new ApiError('The organization id is invalid');
    }
    return this.network.get(`${this.getResourceUrl()}/${id}`);
  }

  /**
   * Retrieve the currently authenticated organization.
   *
   * @since 3.2.0
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/current-organization
   */
  public getCurrent(): Promise<Organization>;
  public getCurrent(callback: Callback<Organization>): void;
  public getCurrent() {
    if (renege(this, this.getCurrent, ...arguments)) return;
    return this.network.get(`${this.getResourceUrl()}/me`);
  }
}
