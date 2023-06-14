import { ProfileData } from '../../data/profiles/data';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<ProfileData, 'name' | 'website' | 'email' | 'phone'> & PickOptional<ProfileData, 'businessCategory' | 'categoryCode' | 'mode'> & IdempotencyParameter;

export type PageParameters = PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type UpdateParameters = PickOptional<ProfileData, 'name' | 'website' | 'email' | 'phone' | 'businessCategory' | 'categoryCode' | 'mode'>;

export interface DeleteParameters extends IdempotencyParameter {}
