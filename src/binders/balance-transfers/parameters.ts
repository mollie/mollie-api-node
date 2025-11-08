import { type BalanceTransferData } from '../../data/balance-transfers/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

interface ContextParameters {
  /**
   * Set this to `true` to use test mode.
   *
   * @see https://docs.mollie.com/reference/create-connect-balance-transfer?path=testmode#body-params
   */
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<BalanceTransferData, 'amount' | 'source' | 'destination' | 'description' | 'category'> & IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
