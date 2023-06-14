import { RefundData, RefundEmbed } from '../../../data/refunds/data';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../../types/parameters';
import PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<RefundData, 'amount' | 'metadata'> & PickOptional<RefundData, 'description'> & IdempotencyParameter;

export type GetParameters = ContextParameters & {
  embed?: RefundEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    embed?: RefundEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type CancelParameters = ContextParameters & IdempotencyParameter;
