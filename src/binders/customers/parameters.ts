import { CustomerData } from '../../data/customers/Customer';
import { PaginationParameters, ThrottlingParameters } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

interface ContextParameters {
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & PickOptional<CustomerData, 'name' | 'email' | 'locale' | 'metadata'>;

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameters;

export type UpdateParameters = ContextParameters & PickOptional<CustomerData, 'name' | 'email' | 'locale' | 'metadata'>;

export type DeleteParameters = ContextParameters;
