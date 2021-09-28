import { ProfileData } from './data';
import Seal from '../../types/Seal';
import ProfileHelper from './ProfileHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Profile = Seal<ProfileData, ProfileHelper>;

export default Profile;

export function transform(networkClient: TransformingNetworkClient, input: ProfileData): Profile {
  return Object.assign(new ProfileHelper(networkClient, input._links), input);
}
