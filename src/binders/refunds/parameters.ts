import { type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
