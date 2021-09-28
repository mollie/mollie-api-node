import Helper from '../Helper';
import { ProfileData } from './data';
import Profile from './Profile';

export default class ProfileHelper extends Helper<ProfileData, Profile> {
  public isUnverified(this: ProfileData) {
    return this.status == 'unverified';
  }

  public isVerified(this: ProfileData) {
    return this.status == 'verified';
  }

  public isBlocked(this: ProfileData) {
    return this.status == 'blocked';
  }
}
