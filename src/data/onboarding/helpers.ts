import commonHelpers from '../commonHelpers';
import { OnboardingData } from './data';

export default {
  ...commonHelpers,
  needsData: function needsData(this: OnboardingData) {
    return this.status == 'needs-data';
  },

  isInReview: function isInReview(this: OnboardingData) {
    return this.status == 'in-review';
  },

  isCompleted: function isCompleted(this: OnboardingData) {
    return this.status == 'completed';
  },
};
