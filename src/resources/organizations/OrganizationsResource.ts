import ApiError from '../../errors/ApiError';
import Callback from '../../types/Callback';
import checkId from '../../plumbing/checkId';
import NetworkClient from '../../NetworkClient';
import Organization, { injectPrototypes, OrganizationData } from '../../data/organizations/Organizations';
import Resource from '../Resource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class OrganizationsResource extends Resource<OrganizationData, Organization> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'organizations';
  }

  /**
   * Retrieve an organization by its ID.
   *
   * If you do not know the organization's ID, you can use the organizations list endpoint to retrieve all organizations that are accessible.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization
   */
  public get(id: string): Promise<Organization>;
  public get(id: string, callback: Callback<Organization>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    if (!checkId(id, 'organization')) {
      throw new ApiError('The organization id is invalid');
    }
    return this.networkClient.get(`${this.getResourceUrl()}/${id}`);
  }

  /**
   * Retrieve the currently authenticated organization.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/organizations-api/current-organization
   */
  public getCurrent(): Promise<Organization>;
  public getCurrent(callback: Callback<Organization>): void;
  public getCurrent() {
    if (renege(this, this.getCurrent, ...arguments)) return;
    return this.networkClient.get(`${this.getResourceUrl()}/me`);
  }
}
