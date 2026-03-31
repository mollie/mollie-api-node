import { PaginationParameters, SortParameter, ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & SortParameter & {
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
