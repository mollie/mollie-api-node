import { ProfileData } from '../../data/profiles/data';
import { PaginationParameters } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<ProfileData, 'name' | 'website' | 'email' | 'phone'> & PickOptional<ProfileData, 'categoryCode' | 'mode'>;

export type ListParameters = PaginationParameters;

export type UpdateParameters = PickOptional<ProfileData, 'name' | 'website' | 'email' | 'phone' | 'categoryCode' | 'mode'>;
