import TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import Organization, { OrganizationData } from '../../data/organizations/Organizations';
import ApiError from '../../errors/ApiError';
import checkId from '../../plumbing/checkId';
import renege from '../../plumbing/renege';
import Callback from '../../types/Callback';
import Binder from '../Binder';

const pathSegment = 'organizations';

export default class OrganizationsBinder extends Binder<OrganizationData, Organization> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
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
    return this.networkClient.get<OrganizationData, Organization>(`${pathSegment}/${id}`);
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
    return this.networkClient.get<OrganizationData, Organization>(`${pathSegment}/me`);
  }
}
