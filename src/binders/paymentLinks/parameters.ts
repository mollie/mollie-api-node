import { type PaymentLinkData } from '../../data/paymentLinks/data';
import { type IdempotencyParameter, type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';
import type PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<PaymentLinkData, 'description'> &
  PickOptional<
    PaymentLinkData,
    'amount' | 'minimumAmount' | 'redirectUrl' | 'webhookUrl' | 'lines' | 'billingAddress' | 'shippingAddress' | 'profileId' | 'reusable' | 'expiresAt' | 'sequenceType' | 'customerId' | 'allowedMethods' | 'applicationFee'
  > & {
    testmode?: boolean;
  } & IdempotencyParameter;

export interface GetParameters {
  testmode?: boolean;
}

export type PageParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type UpdateParameters = Pick<PaymentLinkData, 'description' | 'minimumAmount' | 'archived' | 'allowedMethods' | 'applicationFee'> &
  PickOptional<PaymentLinkData, 'profileId'> & {
  testmode?: boolean;
};

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
