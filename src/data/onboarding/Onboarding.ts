import { OnboardingData } from './data';
import Seal from '../../types/Seal';
import OnboardingHelper from './OnboardingHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Onboarding = Seal<OnboardingData, OnboardingHelper>;

export default Onboarding;

export function transform(networkClient: TransformingNetworkClient, input: OnboardingData): Onboarding {
  return Object.assign(new OnboardingHelper(networkClient, input._links), input);
}
