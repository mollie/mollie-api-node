import { PaginationParameters, ThrottlingParameter } from '../../types/parameters';

export type ListParameters = PaginationParameters;

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameter;
