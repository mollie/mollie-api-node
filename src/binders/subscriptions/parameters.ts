import { PaginationParameters, ThrottlingParameters } from '../../types/parameters';

export type ListParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;
