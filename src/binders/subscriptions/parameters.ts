import { type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters & SortParameter & TestModeParameter & {
  profileId?: string;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
