import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Organization from '../../data/organizations/Organizations';
import { type OrganizationData } from '../../data/organizations/Organizations';
import type PartnerStatus from '../../data/organizations/partner/PartnerStatus';
import { type PartnerStatusData } from '../../data/organizations/partner/data';
import assertWellFormedId from '../../plumbing/assertWellFormedId';
import renege from '../../plumbing/renege';
import withParameterDefaults from '../../plumbing/withParameterDefaults';
import type Callback from '../../types/Callback';
import Binder from '../Binder';
import { type GetParameters } from './parameters';

const pathSegment = 'organizations';

export default class OrganizationsBinder extends Binder<OrganizationData, Organization> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
    withParameterDefaults(this, networkClient, { get: ['testmode'] });
  }

  /**
   * Retrieve an organization by its ID.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/get-organization
   */
  // Four overloads (rather than the params-only pair used by other binders) so the released
  // `get(id, callback)` signature keeps compiling while `testmode` is also accepted.
  public get(id: string): Promise<Organization>;
  /**
   * @deprecated Passing a callback as the second argument is deprecated and will be removed in the next major version. Use the returned promise instead, or pass `parameters` before the callback.
   */
  public get(id: string, callback: Callback<Organization>): void;
  public get(id: string, parameters: GetParameters): Promise<Organization>;
  public get(id: string, parameters: GetParameters, callback: Callback<Organization>): void;
  public get(id: string, parameters?: GetParameters | Callback<Organization>) {
    if (renege(this, this.get, ...arguments)) return;
    assertWellFormedId(id, 'organization');
    return this.networkClient.get<OrganizationData, Organization>(`${pathSegment}/${id}`, parameters as GetParameters | undefined);
  }

  /**
   * Retrieve the currently authenticated organization.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/get-current-organization
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
