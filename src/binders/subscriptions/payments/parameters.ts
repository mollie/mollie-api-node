import { type PaginationParameters, type SortParameter, type ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  testmode?: boolean;
  customerId: string;
  subscriptionId: string;
}

export type PageParameters = ContextParameters & PaginationParameters & SortParameter;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
