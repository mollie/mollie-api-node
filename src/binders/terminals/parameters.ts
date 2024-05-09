import { type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

export type PageParameters = PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type ListParameters = {
  from?: string;
  limit?: number;
};
