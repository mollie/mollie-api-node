import { ProfileData } from './data';
import Seal from '../../types/Seal';
import profileHelpers from './helpers';

type Permission = Seal<ProfileData, typeof profileHelpers>;

export default Permission;

export function injectPrototypes(input: ProfileData): Permission {
  return Object.assign(Object.create(profileHelpers), input);
}
