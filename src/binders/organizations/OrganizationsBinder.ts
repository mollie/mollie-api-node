import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Organization from '../../data/organizations/Organizations';
import { type OrganizationData } from '../../data/organizations/Organizations';
import type PartnerStatus from '../../data/organizations/partner/PartnerStatus';
import { type PartnerStatusData } from '../../data/organizations/partner/data';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import type Callback from '../../types/Callback';
import Binder from '../Binder';

const pathSegment = 'organizations';

export default class OrganizationsBinder extends Binder<OrganizationData, Organization> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Retrieve an organization by its ID.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization
   */
  public get(id: string): Promise<Organization>;
  public get(id: string, callback: Callback<Organization>): void;
  public get(id: string) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'organization');
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

  /**
   * Retrieve partnership details about the currently authenticated organization.
   * Only relevant for partner accounts.
   *
   * @since 4.4.0
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  public getPartnerStatus(): Promise<PartnerStatus>;
  public getPartnerStatus(callback: Callback<PartnerStatus>): void;
  public getPartnerStatus() {
    if (renege(this, this.getPartnerStatus, ...arguments)) return;
    return this.networkClient.get<PartnerStatusData, PartnerStatus>(`${pathSegment}/me/partner`);
  }
}
