import type { PaginationParameters, ThrottlingParameter } from '../../../types/parameters';
import type { CreateParameters as PaymentCreateParameters } from '../../payments/parameters';

interface ContextParameters {
  customerId: string;
}

export type CreateParameters = Omit<PaymentCreateParameters, 'customerId'> & ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
