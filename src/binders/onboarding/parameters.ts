import type { OrganizationAdress } from '../../data/organizations/Organizations';
import { type IdempotencyParameter } from '../../types/parameters';

/**
 * @deprecated Submitting onboarding data is no longer recommended. Use the Client Links API instead to kick off the
 * onboarding process for your merchants.
 */
export interface SubmitParameters extends IdempotencyParameter {
  /**
   * Data of the organization you want to provide.
   *
   * @see https://docs.mollie.com/reference/submit-onboarding-data?path=organization#parameters
   */
  organization?: {
    /**
     * Name of the organization.
     */
    name?: string;
    /**
     * Address of the organization.
     */
    address?: OrganizationAdress;
    /**
     * The Chamber of Commerce registration number of the company.
     */
    registrationNumber?: string;
    /**
     * The VAT number of the organization, if based in the European Union or in the United Kingdom. VAT numbers are
     * verified against the international registry *VIES*.
     *
     * The field can be omitted for merchants residing in other countries.
     */
    vatNumber?: string;
    /**
     * The organization's VAT regulation. Mollie applies Dutch VAT for merchants based in the Netherlands, British VAT
     * for merchants based in the United Kingdom, and shifted VAT for merchants in the European Union.
     *
     * The field can be omitted for merchants residing in other countries.
     */
    vatRegulation?: 'dutch' | 'british' | 'shifted';
  };
  /**
   * Data of the payment profile you want to provide.
   *
   * @see https://docs.mollie.com/reference/submit-onboarding-data?path=profile#parameters
   */
  profile?: {
    /**
     * The profile's name should reflect the tradename or brand name of the profile's website or application.
     */
    name?: string;
    /**
     * The URL to the profile’s website or application. The URL must be compliant to RFC3986 with the exception that we
     * only accept URLs with `http://` or `https://` schemes and domains that contain a TLD. URLs containing an @ are
     * not allowed.
     */
    url?: string;
    /**
     * The email address associated with the profile's tradename or brand.
     *
     * If the domain contains non-ASCII characters, encode it as Punycode per [RFC 3492](https://www.rfc-editor.org/rfc/rfc3492).
     */
    email?: string;
    /**
     * A description of what kind of goods and/or products will be offered via the payment profile.
     */
    description?: string;
    /**
     * The phone number associated with the profile's trade name or brand. Must be in the E.164 format. For example
     * `'+31208202070'`.
     */
    phone?: string;
    /**
     * The industry associated with the profile's tradename or brand. Refer to the business category list documentation
     * for all accepted values.
     *
     * @see https://docs.mollie.com/reference/submit-onboarding-data?path=profile/businessCategory#parameters
     */
    businessCategory?: string;
    /**
     * The industry associated with the profile's tradename or brand.
     *
     * Possible values:
     * * `4121` Travel, rental and transportation
     * * `5192` Books, magazines and newspapers
     * * `5399` General merchandise
     * * `5499` Food and drinks
     * * `5533` Automotive Products
     * * `5641` Children Products
     * * `5651` Clothing & Shoes
     * * `5732` Electronics, computers and software
     * * `5735` Entertainment
     * * `5815` Digital services
     * * `5944` Jewelry & Accessories
     * * `5977` Health & Beauty products
     * * `6012` Financial services
     * * `7299` Personal services
     * * `7999` Events, festivals and recreation
     * * `8398` Charity and donations
     *
     * @deprecated Use {@link businessCategory} instead. The numeric category code is no longer part of the onboarding API.
     */
    categoryCode?: number;
  };
}
