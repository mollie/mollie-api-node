import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type Address, type Links, type Locale, type Url } from '../global';
import type Model from '../Model';
import OrganizationHelper from './OrganizationHelper';

export interface OrganizationData extends Model<'organization'> {
  /**
   * The name of the organization.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=name#response
   */
  name: string;
  /**
   * The email address associated with the organization.
   *
   * If the domain contains non-ASCII characters, encode it as Punycode per [RFC 3492](https://www.rfc-editor.org/rfc/rfc3492).
   *
   * @see https://docs.mollie.com/reference/get-organization?path=email#response
   */
  email: string;
  /**
   * The preferred locale of the merchant which has been set in Mollie Dashboard.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=locale#response
   */
  locale: Locale;
  /**
   * The address of the organization.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=address#response
   */
  address: OrganizationAdress;
  /**
   * The registration number of the organization at the (local) chamber of commerce.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=registrationNumber#response
   */
  registrationNumber: string;
  /**
   * The VAT number of the organization, if based in the European Union or in the United Kingdom. The VAT number has been checked with the [VIES](http://ec.europa.eu/taxation_customs/vies/) service by Mollie.
   *
   * The field is not present for merchants residing in other countries.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=vatNumber#response
   */
  vatNumber: string;
  /**
   * The organization's VAT regulation. Either `dutch` (Dutch VAT, for merchants based in The Netherlands), `british` (British VAT, for merchants based in the United Kingdom), or `shifted` (shifted VAT, for merchants in the European Union).
   *
   * The field is not present for merchants residing in other countries.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=vatRegulation#response
   */
  vatRegulation: string;
  /**
   * An object with several URL objects relevant to the organization. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=_links#response
   */
  _links: OrganizationLinks;
}

export type OrganizationAdress = Pick<Address, 'streetAndNumber' | 'postalCode' | 'city' | 'country'>;

type Organization = Seal<OrganizationData, OrganizationHelper>;

export default Organization;

export interface OrganizationLinks extends Links {
  /**
   * Direct link to the organization's Mollie dashboard.
   *
   * @see https://docs.mollie.com/reference/get-organization?path=_links/dashboard#response
   */
  dashboard?: Url;
}

export function transform(networkClient: TransformingNetworkClient, input: OrganizationData): Organization {
  return Object.assign(Object.create(new OrganizationHelper(networkClient, input._links)), input);
}
