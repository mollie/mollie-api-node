import { PaginationParameters } from '../../../types/parameters';

interface ContextParameters {
  testmode?: boolean;
  customerId: string;
  subscriptionId: string;
}

export type ListParameters = ContextParameters & PaginationParameters;
