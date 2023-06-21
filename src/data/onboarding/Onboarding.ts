import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type OnboardingData } from './data';
import OnboardingHelper from './OnboardingHelper';

type Onboarding = Seal<OnboardingData, OnboardingHelper>;

export default Onboarding;

export function transform(networkClient: TransformingNetworkClient, input: OnboardingData): Onboarding {
  return Object.assign(Object.create(new OnboardingHelper(networkClient, input._links)), input);
}
