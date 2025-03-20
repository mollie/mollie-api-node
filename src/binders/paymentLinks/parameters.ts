import { type PaymentLinkData } from '../../data/paymentLinks/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

export type CreateParameters = Pick<PaymentLinkData, 'description' | 'amount' | 'redirectUrl' | 'webhookUrl' | 'expiresAt'> & {
  profileId?: string;
  testmode?: boolean;
} & IdempotencyParameter;

export interface GetParameters {
  testmode?: boolean;
}

export type PageParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
