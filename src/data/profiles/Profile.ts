import { ProfileData } from './data';
import Seal from '../../types/Seal';
import profileHelpers from './helpers';

type Profile = Seal<ProfileData, typeof profileHelpers>;

export default Profile;

export function transform(input: ProfileData): Profile {
  return Object.assign(Object.create(profileHelpers), input);
}
