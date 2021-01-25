import { Links, Url } from '../global';
import Model from '../Model';

/**
 * Get the status of onboarding of the authenticated organization.
 *
 * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status
 */
export interface OnboardingData extends Model<'onboarding', undefined> {
  /**
   * The name of the organization.
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=name#response
   */
  name: string;
  /**
   * The sign up date and time of the organization.
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=signedUpAt#response
   */
  signedUpAt: string;
  /**
   * The current status of the organization's onboarding process. Possible values:
   *
   * -   `needs-data` The onboarding is not completed and the merchant needs to provide (more) information
   * -   `in-review` The merchant provided all information and Mollie needs to check this
   * -   `completed` The onboarding is completed
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=status#response
   */
  status: 'needs-data' | 'in-review' | 'completed';
  /**
   * Whether or not the organization can receive payments.
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=canReceivePayments#response
   */
  canReceivePayments: boolean;
  /**
   * Whether or not the organization can receive settlements.
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=canReceiveSettlements#response
   */
  canReceiveSettlements: boolean;
  /**
   * An object with several URL objects relevant to the onboarding status. Every URL object will contain an `href` and a `type` field.
   *
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status?path=_links#response
   */
  _links: OnboardingLinks;
}

export interface OnboardingLinks extends Links {
  dashboard: Url;
  organization: Url;
}
