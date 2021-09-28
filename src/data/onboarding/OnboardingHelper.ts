import Helper from '../Helper';
import { OnboardingData } from './data';
import Onboarding from './Onboarding';

export default class OnboardingHelper extends Helper<OnboardingData, Onboarding> {
  public needsData(this: OnboardingData) {
    return this.status == 'needs-data';
  }

  public isInReview(this: OnboardingData) {
    return this.status == 'in-review';
  }

  public isCompleted(this: OnboardingData) {
    return this.status == 'completed';
  }
}
