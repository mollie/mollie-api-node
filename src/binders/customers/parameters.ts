import { CustomerData } from '../../data/customers/Customer';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

interface ContextParameter {
  testmode?: boolean;
}

export type CreateParameters = ContextParameter & PickOptional<CustomerData, 'name' | 'email' | 'locale' | 'metadata'> & IdempotencyParameter;

export type GetParameters = ContextParameter;

export type PageParameters = ContextParameter & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type UpdateParameters = ContextParameter & PickOptional<CustomerData, 'name' | 'email' | 'locale' | 'metadata'>;

export type DeleteParameters = ContextParameter & IdempotencyParameter;
