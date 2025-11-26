import { type Url } from '../global';
import type Model from '../Model';
/**
 * Capability data for an organization.
 *
 * @see https://docs.mollie.com/reference/list-capabilities
 */
export interface CapabilityData
  extends Omit<
    Model<'capability'>,
    'id' // Capabilities use `name` as identifier instead of `id`, so we omit `id` from Model.
  > {
  /**
   * A unique name for this capability like `payments` or `settlements`.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=name#response
   */
  name: string;
  /**
   * The status of the capability.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=status#response
   */
  status: CapabilityStatus;
  /**
   * The reason why the capability is in its current status, if applicable.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=statusReason#response
   */
  statusReason?: CapabilityStatusReason;
  /**
   * Array of requirements that need to be fulfilled to enable or re-enable the capability.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=requirements#response
   */
  requirements: Requirement[];
}

/**
 * A requirement for a capability.
 *
 * @see https://docs.mollie.com/reference/list-capabilities
 */
export interface Requirement {
  /**
   * The name of this requirement, referring to the task to be fulfilled by the organization
   * to enable or re-enable the capability. The name is unique among other requirements of
   * the same capability.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=id#response
   */
  id: string;
  /**
   * The status of the requirement depends on its due date. If no due date is given,
   * the status will be `requested`.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=status#response
   */
  status: RequirementStatus;
  /**
   * Due date until the requirement must be fulfilled, if any.
   * The date is shown in ISO-8601 format.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=dueDate#response
   */
  dueDate: string | null;
  /**
   * Links related to this requirement.
   *
   * @see https://docs.mollie.com/reference/list-capabilities?path=_links#response
   */
  _links: {
    /**
     * The dashboard URL where the requirement can be fulfilled.
     */
    dashboard: Url;
  };
}

/**
 * Capability status.
 *
 * @see https://docs.mollie.com/reference/list-capabilities
 */
export enum CapabilityStatus {
  unrequested = 'unrequested',
  enabled = 'enabled',
  disabled = 'disabled',
  pending = 'pending',
}

/**
 * Reason why a capability is in its current status.
 *
 * @see https://docs.mollie.com/reference/list-capabilities
 */
export enum CapabilityStatusReason {
  requirementPastDue = 'requirement-past-due',
  onboardingInformationNeeded = 'onboarding-information-needed',
}

/**
 * Requirement status.
 *
 * @see https://docs.mollie.com/reference/list-capabilities
 */
export enum RequirementStatus {
  currentlyDue = 'currently-due',
  pastDue = 'past-due',
  requested = 'requested',
}
