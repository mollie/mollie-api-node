import type Model from '../../Model';
import { type Links, type Url } from '../../global';

/**
 * Partner status information for the currently authenticated organization.
 *
 * @see https://docs.mollie.com/reference/get-partner-status
 */
export interface PartnerStatusData extends Model<'partner'> {
  /**
   * Indicates the type of partner. Will be null if the currently authenticated organization is not enrolled as a partner.
   * Possible values: "oauth", "signuplink", "useragent"
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  partnerType: 'oauth' | 'signuplink' | 'useragent' | null;
  /**
   * Whether the current organization is receiving commissions.
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  isCommissionPartner: boolean;
  /**
   * Array of User-Agent token objects. Present if the organization is a partner of type "useragent", or if they were in the past.
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  userAgentTokens?: Array<{
    /**
     * The unique User-Agent token.
     */
    token: string;
    /**
     * The date from which the token is active, in ISO 8601 format.
     */
    startsAt: string;
    /**
     * The date until when the token will be active, in ISO 8601 format. Will be null if the token does not have an end date (yet).
     */
    endsAt: string | null;
  }>;
  /**
   * The date the partner contract was signed, in ISO 8601 format. Omitted if no contract has been signed (yet).
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  partnerContractSignedAt?: string;
  /**
   * Whether an update to the partner contract is available and requiring the organization's agreement.
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  partnerContractUpdateAvailable?: boolean;
  /**
   * The expiration date of the signed partner contract, in ISO 8601 format. Omitted if contract has no expiration date (yet).
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  partnerContractExpiresAt?: string;
  /**
   * An object with several URL objects relevant to the partner status.
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  _links: PartnerStatusLinks;
}

export interface PartnerStatusLinks extends Links {
  /**
   * The URL that can be used to have new organizations sign up and be automatically linked to this partner.
   * Will be omitted if the partner is not of type "signuplink".
   *
   * @see https://docs.mollie.com/reference/get-partner-status
   */
  signuplink?: Url;
}
