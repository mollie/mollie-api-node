import { type Address, type Locale } from '../../data/global';
import { type IdempotencyParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';
import type PickRequired from '../../types/PickRequired';

/**
 * Personal data of the customer (owner of the organization).
 *
 * @see https://docs.mollie.com/reference/create-client-link?path=owner#body-params
 */
type Owner = PickRequired<Address, 'email' | 'givenName' | 'familyName'> & {
  /**
   * Preset the language to be used for the login screen, if applicable.
   * When this parameter is omitted, the browser language will be used instead.
   */
  locale?: Locale;
};

/**
 * Address of the organization being linked. Only `country` is required.
 *
 * @see https://docs.mollie.com/reference/create-client-link?path=address#body-params
 */
type OrganizationAddress = PickRequired<Address, 'country'> & PickOptional<Address, 'streetAndNumber' | 'postalCode' | 'city'>;

export interface CreateParameters extends IdempotencyParameter {
  /**
   * Personal data of your customer.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=owner#body-params
   */
  owner: Owner;
  /**
   * Name of the organization.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=name#body-params
   */
  name: string;
  /**
   * Address of the organization. Only `country` is required.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=address#body-params
   */
  address: OrganizationAddress;
  /**
   * The registration number of the organization at their local chamber of commerce.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=registrationNumber#body-params
   */
  registrationNumber?: string;
  /**
   * The VAT number of the organization, if based in the European Union.
   * VAT numbers are verified against the international registry VIES.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=vatNumber#body-params
   */
  vatNumber?: string;
  /**
   * The legal entity type of the organization, based on its country of origin. Please refer to the
   * [legal entity list](https://docs.mollie.com/overview/common-data-types#legal-entity) for all possible options.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=legalEntity#body-params
   */
  legalEntity?: string;
  /**
   * The registration office that the organization was registered at. Please refer to the
   * [registration office list](https://docs.mollie.com/overview/common-data-types#registration-office) for all possible options.
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=registrationOffice#body-params
   */
  registrationOffice?: string;
  /**
   * The incorporation date of the organization (format `YYYY-MM-DD`).
   *
   * @see https://docs.mollie.com/reference/create-client-link?path=incorporationDate#body-params
   */
  incorporationDate?: string;
}
