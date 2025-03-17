import { type RefundData, type RefundEmbed } from '../../../data/refunds/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../../types/parameters';
import type PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  paymentId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters & Pick<RefundData, 'amount'> & PickOptional<RefundData, 'description' | 'metadata'> & IdempotencyParameter;

export type GetParameters = ContextParameters & {
  embed?: RefundEmbed[];
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    embed?: RefundEmbed[];
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type CancelParameters = ContextParameters & IdempotencyParameter;
