import { Links, Url } from '../global';
import Model from '../Model';

/**
 * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status
 */
export interface OnboardingData extends Model<'onboarding', undefined> {
  /**
   * The name of the organization.
   */
  name: string;
  /**
   * The sign up date and time of the organization.
   */
  signedUpAt: string;
  /**
   * The current status of the organization’s onboarding process. Possible values:
   *
   *  * `'needs-data'`: The onboarding is not completed and the merchant needs to provide (more) information
   *  * `'in-review'`: The merchant provided all information and Mollie needs to check this
   *  * `'completed'`: The onboarding is completed
   */
  status: 'needs-data' | 'in-review' | 'completed';
  /**
   * Whether or not the organization can receive payments.
   */
  canReceivePayments: boolean;
  /**
   * Whether or not the organization can receive settlements.
   */
  canReceiveSettlements: boolean;
  /**
   * An object with several URL objects relevant to the onboarding status.
   */
  _links: OnboardingLinks;
}

export interface OnboardingLinks extends Links {
  /**
   * The URL of the onboarding process in Mollie Dashboard. You can redirect your customer to here for e.g. completing
   * the onboarding process.
   */
  dashboard: Url;
  /**
   * The API resource URL of the organization.
   */
  organization: Url;
}
