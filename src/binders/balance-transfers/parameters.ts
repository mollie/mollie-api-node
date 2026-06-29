import { type BalanceTransferData } from '../../data/balance-transfers/data';
import { type IdempotencyParameter, type PaginationParameters, type SortParameter, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';

type ContextParameters = TestModeParameter;

export type CreateParameters = ContextParameters &
  Pick<BalanceTransferData, 'amount' | 'source' | 'destination' | 'description' | 'category'> &
  PickOptional<BalanceTransferData, 'metadata'> &
  IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters & SortParameter;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
