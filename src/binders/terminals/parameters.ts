import { PaginationParameters, ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & {
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
