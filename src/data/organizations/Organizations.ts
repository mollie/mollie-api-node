import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type Address, type Links, type Locale } from '../global';
import Helper from '../Helper';
import type Model from '../Model';

export interface OrganizationData extends Model<'organization'> {
  /**
   * The name of the organization.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=name#response
   */
  name: string;
  /**
   * The preferred locale of the merchant which has been set in Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=locale#response
   */
  locale: Locale;
  /**
   * The address of the organization.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=address#response
   */
  address: Address;
  /**
   * The registration number of the organization at the (local) chamber of commerce.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=registrationNumber#response
   */
  registrationNumber: string;
  /**
   * The VAT number of the organization, if based in the European Union. The VAT number has been checked with the [VIES](http://ec.europa.eu/taxation_customs/vies/) service by Mollie.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=vatNumber#response
   */
  vatNumber: string;
  /**
   * The organization's VAT regulation, if based in the European Union. Either `shifted` (VAT is shifted) or `dutch` (Dutch VAT rate).
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=vatRegulation#response
   */
  vatRegulation: string;
  /**
   * An object with several URL objects relevant to the organization. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization?path=_links#response
   */
  _links: OrganizationLinks;
}

type Organization = Seal<OrganizationData, Helper<OrganizationData, Organization>>;

export default Organization;

export type OrganizationLinks = Links;

export function transform(networkClient: TransformingNetworkClient, input: OrganizationData): Organization {
  return Object.assign(Object.create(new Helper<OrganizationData, Organization>(networkClient, input._links)), input);
}
