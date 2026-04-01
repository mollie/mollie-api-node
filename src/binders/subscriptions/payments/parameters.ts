import { type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters extends TestModeParameter {
  customerId: string;
  subscriptionId: string;
}

export type PageParameters = ContextParameters & PaginationParameters & SortParameter;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
