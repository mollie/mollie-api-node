import { type BalanceTransferData } from '../../data/balance-transfers/data';
import { type IdempotencyParameter, type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';

type ContextParameters = TestModeParameter;

export type CreateParameters = ContextParameters & Pick<BalanceTransferData, 'amount' | 'source' | 'destination' | 'description' | 'category'> & IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters & SortParameter;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
