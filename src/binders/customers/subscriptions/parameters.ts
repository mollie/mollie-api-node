import { SubscriptionData } from '../../../data/subscriptions/data';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../../types/parameters';
import PickOptional from '../../../types/PickOptional';

interface ContextParameters {
  customerId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<SubscriptionData, 'amount' | 'interval' | 'description' | 'mandateId'> &
  PickOptional<SubscriptionData, 'times' | 'startDate' | 'method' | 'webhookUrl' | 'metadata'> &
  IdempotencyParameter;

export type GetParameters = ContextParameters;

export type PageParameters = ContextParameters & PaginationParameters;

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;

export type UpdateParameters = ContextParameters &
  Pick<SubscriptionData, 'mandateId'> &
  PickOptional<SubscriptionData, 'amount' | 'description' | 'interval' | 'metadata' | 'startDate' | 'times' | 'webhookUrl'>;

export type CancelParameters = ContextParameters & IdempotencyParameter;
