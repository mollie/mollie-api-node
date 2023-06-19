import { PaginationParameters, ThrottlingParameter } from '../../../types/parameters';

interface ContextParameters {
  testmode?: boolean;
  customerId: string;
  subscriptionId: string;
}

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
