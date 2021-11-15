import TransformingNetworkClient from '../../TransformingNetworkClient';
import Seal from '../../types/Seal';
import { OnboardingData } from './data';
import OnboardingHelper from './OnboardingHelper';

type Onboarding = Seal<OnboardingData, OnboardingHelper>;

export default Onboarding;

export function transform(networkClient: TransformingNetworkClient, input: OnboardingData): Onboarding {
  return Object.assign(Object.create(new OnboardingHelper(networkClient, input._links)), input);
}
