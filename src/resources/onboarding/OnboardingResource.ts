import { OnboardingData } from '../../data/onboarding/data';
import { SubmitParameters } from './parameters';
import Callback from '../../types/Callback';
import NetworkClient from '../../NetworkClient';
import Onboarding, { injectPrototypes } from '../../data/onboarding/Onboarding';
import Resource from '../Resource';
import TransformingNetworkClient from '../../TransformingNetworkClient';
import renege from '../../plumbing/renege';

export default class OnboardingResource extends Resource<OnboardingData, Onboarding> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(): string {
    return 'onboarding/me';
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
    return this.networkClient.get(this.getResourceUrl());
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
    return this.networkClient.post<true>(this.getResourceUrl(), parameters);
  }
}
