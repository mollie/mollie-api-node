import { type PaginationParameters, type SortParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & SortParameter & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
