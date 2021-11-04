import { OnboardingData } from '../../data/onboarding/data';
import Onboarding from '../../data/onboarding/Onboarding';
import renege from '../../plumbing/renege';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import Callback from '../../types/Callback';
import Binder from '../Binder';
import { SubmitParameters } from './parameters';

const pathSegments = 'onboarding/me';

export default class OnboardingBinder extends Binder<OnboardingData, Onboarding> {
  constructor(protected readonly networkClient: TransformingNetworkClient) {
    super();
  }

  /**
   * Get the status of onboarding of the authenticated organization.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status
   */
  public get(): Promise<Onboarding>;
  public get(callback: Callback<Onboarding>): void;
  public get() {
    if (renege(this, this.get, ...arguments)) return;
    return this.networkClient.get<OnboardingData, Onboarding>(pathSegments);
  }

  /**
   * Submit data that will be prefilled in the merchant's onboarding. Please note that the data you submit will only be processed when the onboarding status is `needs-data`.
   *
   * @since 3.2.0
   * @see https://docs.mollie.com/reference/v2/onboarding-api/submit-onboarding-data
   */
  public submit(parameters?: SubmitParameters): Promise<true>;
  public submit(parameters: SubmitParameters, callback: Callback<true>): void;
  public submit(parameters: SubmitParameters) {
    if (renege(this, this.submit, ...arguments)) return;
    return this.networkClient.post<OnboardingData, true>(pathSegments, parameters);
  }
}
