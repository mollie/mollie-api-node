import { CommonListParameters } from '../../types/parameters';
import { ProfileData } from '../../data/profiles/Profile';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<ProfileData, 'name' | 'website' | 'email' | 'phone'> & PickOptional<ProfileData, 'categoryCode' | 'mode'>;

export type ListParameters = CommonListParameters;

export type UpdateParameters = PickOptional<ProfileData, 'name' | 'website' | 'email' | 'phone' | 'categoryCode' | 'mode'>;
