import { type PaymentLinkData } from '../../data/paymentLinks/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

export type CreateParameters = Pick<PaymentLinkData, 'description' | 'amount' | 'minimumAmount' | 'redirectUrl' | 'webhookUrl' | 'reusable' | 'expiresAt' | 'allowedMethods'> & {
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

export type UpdateParameters = Pick<PaymentLinkData, 'description' | 'minimumAmount' | 'archived' | 'allowedMethods'> & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
