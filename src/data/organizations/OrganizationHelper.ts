import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Nullable from '../../types/Nullable';
import Helper from '../Helper';
import type Organization from './Organizations';
import { type OrganizationData } from './Organizations';

export default class OrganizationHelper extends Helper<OrganizationData, Organization> {
  constructor(
    networkClient: TransformingNetworkClient,
    protected readonly links: OrganizationData['_links'],
  ) {
    super(networkClient, links);
  }

  /**
   * Returns the direct link to the organization in the Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=_links/dashboard#response
   */
  public getDashboardUrl(): Nullable<string> {
    return this.links.dashboard?.href ?? null;
  }
}
