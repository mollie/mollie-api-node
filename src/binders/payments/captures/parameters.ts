import { type CaptureData, type CaptureInclude } from '../../../data/payments/captures/data';
import type MaybeArray from '../../../types/MaybeArray';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../../types/parameters';
import type PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  paymentId: string;
}

export type CreateParameters = ContextParameters & PickOptional<CaptureData, 'amount' | 'description' | 'metadata'> & IdempotencyParameter;

export type GetParameters = ContextParameters & {
  include?: MaybeArray<CaptureInclude>;
  testmode?: boolean;
};

export type PageParameters = ContextParameters &
  PaginationParameters & {
    include?: MaybeArray<CaptureInclude>;
    testmode?: boolean;
  };

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
