import { OnboardingData } from './data';
import Seal from '../../types/Seal';
import onboardingHelpers from './helpers';

type Onboarding = Seal<OnboardingData, typeof onboardingHelpers>;

export default Onboarding;

export function transform(input: OnboardingData): Onboarding {
  return Object.assign(Object.create(onboardingHelpers), input);
}
