import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type ProfileData } from './data';
import ProfileHelper from './ProfileHelper';

type Profile = Seal<ProfileData, ProfileHelper>;

export default Profile;

export function transform(networkClient: TransformingNetworkClient, input: ProfileData): Profile {
  return Object.assign(Object.create(new ProfileHelper(networkClient, input._links)), input);
}
