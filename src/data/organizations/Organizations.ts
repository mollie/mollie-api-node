import { Address, Links, Locale, Url } from '../global';
import Model from '../Model';
import Seal from '../../types/Seal';
import commonHelpers from '../commonHelpers';

/**
 * @see https://docs.mollie.com/reference/v2/organizations-api/get-organization
 */
export interface OrganizationData extends Model<'organization', string> {
  /**
   * The name of the organization.
   */
  name: string;
  /**
   * The preferred locale of the merchant which has been set in Mollie Dashboard.
   */
  locale: Locale;
  /**
   * The address of the organization.
   */
  address: Address;
  /**
   * The registration number of the organization at the (local) chamber of commerce.
   */
  registrationNumber: string;
  /**
   * The VAT number of the organization, if based in the European Union. The VAT number has been checked with the VIES
   * service by Mollie.
   */
  vatNumber: string;
  /**
   * The organization's VAT regulation, if based in the European Union. Either shifted (VAT is shifted) or dutch (Dutch
   * VAT rate).
   */
  vatRegulation: string;
  /**
   * An object with several URL objects relevant to the organization.
   */
  _links: OrganizationLinks;
}

type Organization = Seal<OrganizationData, typeof commonHelpers>;

export default Organization;

export interface OrganizationLinks extends Links {}

export function injectPrototypes(input: OrganizationData): Organization {
  return Object.assign(Object.create(commonHelpers), input);
}
