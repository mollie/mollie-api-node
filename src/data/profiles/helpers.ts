import commonHelpers from '../commonHelpers';
import { ProfileData } from './data';

export default {
  ...commonHelpers,
  isUnverified: function isUnverified(this: ProfileData) {
    return this.status == 'unverified';
  },

  isVerified: function isInReview(this: ProfileData) {
    return this.status == 'verified';
  },

  isBlocked: function isBlocked(this: ProfileData) {
    return this.status == 'blocked';
  },
};
