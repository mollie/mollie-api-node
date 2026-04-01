import { type PaymentLinkData } from '../../data/paymentLinks/data';
import { type IdempotencyParameter, type PaginationParameters, type TestModeParameter, type ThrottlingParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';

type ContextParameters = TestModeParameter;

export type CreateParameters = Pick<PaymentLinkData, 'description'> &
  PickOptional<
    PaymentLinkData,
    'amount' | 'minimumAmount' | 'redirectUrl' | 'webhookUrl' | 'lines' | 'billingAddress' | 'shippingAddress' | 'profileId' | 'reusable' | 'expiresAt' | 'sequenceType' | 'customerId' | 'allowedMethods' | 'applicationFee'
  > &
  ContextParameters &
  IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters & {
  profileId?: string;
};

export type UpdateParameters = Pick<PaymentLinkData, 'description' | 'minimumAmount' | 'archived' | 'allowedMethods' | 'applicationFee'> &
  PickOptional<PaymentLinkData, 'profileId'> &
  ContextParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
